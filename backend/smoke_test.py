"""
Smoke test for the Feedback Management System API.

Run this AFTER starting the backend (`uvicorn main:app --reload`).

    python smoke_test.py

It exercises every endpoint and prints a green PASS or red FAIL for each.
Useful right before taking screenshots — confirms the system is healthy.
"""
import sys
import time

import requests

BASE_URL = "http://localhost:8000"

# ANSI colors
GREEN = "\033[92m"
RED = "\033[91m"
CYAN = "\033[96m"
RESET = "\033[0m"


passed = 0
failed = 0


def step(name, fn):
    """Run a test step and report PASS/FAIL."""
    global passed, failed
    try:
        fn()
        print(f"  {GREEN}PASS{RESET}  {name}")
        passed += 1
    except AssertionError as e:
        print(f"  {RED}FAIL{RESET}  {name}  ->  {e}")
        failed += 1
    except Exception as e:
        print(f"  {RED}FAIL{RESET}  {name}  ->  {type(e).__name__}: {e}")
        failed += 1


def main():
    print(f"\n{CYAN}=== FMS API Smoke Test ==={RESET}")
    print(f"Target: {BASE_URL}\n")

    # ---- Health ----
    print(f"{CYAN}[Health]{RESET}")

    def check_health():
        r = requests.get(f"{BASE_URL}/")
        assert r.status_code == 200, f"expected 200 got {r.status_code}"
        assert "name" in r.json(), "missing 'name' field"

    step("GET /  returns API metadata", check_health)

    # ---- CRUD ----
    print(f"\n{CYAN}[CRUD]{RESET}")
    feedback_id = {"value": None}

    def create():
        r = requests.post(
            f"{BASE_URL}/feedback",
            json={
                "participant_name": "Smoke Test User",
                "program_name": "Smoke Test Program",
                "rating": 5,
                "comments": "Automated smoke test entry.",
            },
        )
        assert r.status_code == 201, f"expected 201 got {r.status_code}: {r.text}"
        body = r.json()
        assert "feedback_id" in body
        feedback_id["value"] = body["feedback_id"]

    step("POST /feedback  creates new entry (201)", create)

    def get_by_id():
        fid = feedback_id["value"]
        r = requests.get(f"{BASE_URL}/feedback/{fid}")
        assert r.status_code == 200
        assert r.json()["feedback_id"] == fid

    step("GET /feedback/{id}  retrieves entry", get_by_id)

    def list_all():
        r = requests.get(f"{BASE_URL}/feedback")
        assert r.status_code == 200
        assert isinstance(r.json(), list)
        assert len(r.json()) >= 1

    step("GET /feedback  returns list", list_all)

    def filter_by_rating():
        r = requests.get(f"{BASE_URL}/feedback?rating=5")
        assert r.status_code == 200
        assert all(item["rating"] == 5 for item in r.json())

    step("GET /feedback?rating=5  filters correctly", filter_by_rating)

    def update():
        fid = feedback_id["value"]
        r = requests.put(f"{BASE_URL}/feedback/{fid}", json={"rating": 4})
        assert r.status_code == 200
        assert r.json()["rating"] == 4

    step("PUT /feedback/{id}  updates entry", update)

    # ---- Search ----
    print(f"\n{CYAN}[Search]{RESET}")

    def search_keyword():
        r = requests.get(f"{BASE_URL}/search", params={"keyword": "smoke"})
        assert r.status_code == 200
        assert any(item["feedback_id"] == feedback_id["value"] for item in r.json())

    step("GET /search?keyword=smoke  finds entry", search_keyword)

    def search_combined():
        r = requests.get(
            f"{BASE_URL}/search",
            params={"keyword": "smoke", "rating": 4, "program": "Smoke"},
        )
        assert r.status_code == 200
        assert all(item["rating"] == 4 for item in r.json())

    step("GET /search  with combined filters", search_combined)

    # ---- Stats ----
    print(f"\n{CYAN}[Stats]{RESET}")

    def stats():
        r = requests.get(f"{BASE_URL}/feedback/stats")
        assert r.status_code == 200
        body = r.json()
        for key in ("total_feedback", "average_rating", "rating_distribution"):
            assert key in body, f"missing {key}"
        assert body["total_feedback"] >= 1

    step("GET /feedback/stats  returns aggregate", stats)

    # ---- Validation / errors ----
    print(f"\n{CYAN}[Error handling]{RESET}")

    def invalid_rating():
        r = requests.post(
            f"{BASE_URL}/feedback",
            json={"participant_name": "X", "program_name": "Y", "rating": 9},
        )
        assert r.status_code == 422, f"expected 422 got {r.status_code}"
        assert "errors" in r.json()

    step("POST /feedback rating=9  returns 422", invalid_rating)

    def not_found():
        r = requests.get(f"{BASE_URL}/feedback/99999")
        assert r.status_code == 404

    step("GET /feedback/99999  returns 404", not_found)

    # ---- Cleanup ----
    print(f"\n{CYAN}[Cleanup]{RESET}")

    def delete():
        fid = feedback_id["value"]
        r = requests.delete(f"{BASE_URL}/feedback/{fid}")
        assert r.status_code == 200

    step("DELETE /feedback/{id}  removes entry", delete)

    def confirm_deleted():
        fid = feedback_id["value"]
        r = requests.get(f"{BASE_URL}/feedback/{fid}")
        assert r.status_code == 404

    step("GET deleted entry  returns 404", confirm_deleted)

    # ---- Summary ----
    print(f"\n{CYAN}=== Summary ==={RESET}")
    total = passed + failed
    color = GREEN if failed == 0 else RED
    print(f"{color}{passed}/{total} passed{RESET}\n")
    return 0 if failed == 0 else 1


if __name__ == "__main__":
    try:
        sys.exit(main())
    except requests.exceptions.ConnectionError:
        print(
            f"{RED}Could not connect to {BASE_URL}.{RESET}\n"
            "Start the backend first:\n"
            "    cd backend && uvicorn main:app --reload"
        )
        sys.exit(1)
