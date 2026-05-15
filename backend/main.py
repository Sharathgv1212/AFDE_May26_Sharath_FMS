"""
Feedback Management System - FastAPI entry point.

Run locally (from the project root):
    py -m uvicorn backend.main:app --reload
"""
from fastapi import FastAPI, Request, status
from fastapi.exceptions import RequestValidationError
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from .db import Base, engine
from .routers import feedback, search

# Create all tables on startup (idempotent - safe to call repeatedly)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Feedback Management System API",
    description="REST API for centralized feedback collection, search, and management.",
    version="1.0.0",
)

# CORS - allow the React dev server (and any future deployed origin) to call the API
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://localhost:3000",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Routers
app.include_router(feedback.router)
app.include_router(search.router)


@app.get("/", tags=["Health"])
def root():
    """Health check / API landing."""
    return {
        "name": "Feedback Management System API",
        "version": "1.0.0",
        "docs": "/docs",
    }


@app.exception_handler(RequestValidationError)
async def validation_exception_handler(request: Request, exc: RequestValidationError):
    """Return a clean error envelope instead of FastAPI's default verbose output."""
    errors_list = []
    for err in exc.errors():
        field_path = ".".join(str(loc) for loc in err["loc"][1:])
        errors_list.append({"field": field_path, "message": err["msg"]})
    return JSONResponse(
        status_code=status.HTTP_422_UNPROCESSABLE_ENTITY,
        content={"detail": "Validation failed", "errors": errors_list},
    )
