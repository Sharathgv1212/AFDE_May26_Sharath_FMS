"""
Feedback API routes - full CRUD plus search and stats endpoints.
"""
from typing import Optional

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..db import get_db

router = APIRouter(prefix="/feedback", tags=["Feedback"])


@router.get("", response_model=list[schemas.FeedbackResponse])
def get_all_feedback(
    skip: int = Query(0, ge=0),
    limit: int = Query(100, ge=1, le=500),
    rating: Optional[int] = Query(None, ge=1, le=5),
    program: Optional[str] = Query(None),
    db: Session = Depends(get_db),
):
    """Retrieve all feedback entries, newest first. Supports rating/program filters."""
    return crud.list_feedback(db, skip=skip, limit=limit, rating=rating, program=program)


@router.get("/stats", response_model=schemas.FeedbackStats)
def feedback_stats(db: Session = Depends(get_db)):
    """Aggregate dashboard statistics."""
    return crud.get_stats(db)


@router.get("/{feedback_id}", response_model=schemas.FeedbackResponse)
def get_feedback_by_id(feedback_id: int, db: Session = Depends(get_db)):
    """Retrieve a single feedback entry by ID."""
    db_feedback = crud.get_feedback(db, feedback_id)
    if not db_feedback:
        raise HTTPException(status_code=404, detail=f"Feedback {feedback_id} not found")
    return db_feedback


@router.post("", response_model=schemas.FeedbackResponse, status_code=status.HTTP_201_CREATED)
def submit_feedback(payload: schemas.FeedbackCreate, db: Session = Depends(get_db)):
    """Submit a new feedback entry."""
    return crud.create_feedback(db, payload)


@router.put("/{feedback_id}", response_model=schemas.FeedbackResponse)
def update_feedback(
    feedback_id: int, payload: schemas.FeedbackUpdate, db: Session = Depends(get_db)
):
    """Update one or more fields of an existing feedback entry."""
    updated = crud.update_feedback(db, feedback_id, payload)
    if not updated:
        raise HTTPException(status_code=404, detail=f"Feedback {feedback_id} not found")
    return updated


@router.delete("/{feedback_id}", status_code=status.HTTP_200_OK)
def delete_feedback(feedback_id: int, db: Session = Depends(get_db)):
    """Delete a feedback entry by ID."""
    deleted = crud.delete_feedback(db, feedback_id)
    if not deleted:
        raise HTTPException(status_code=404, detail=f"Feedback {feedback_id} not found")
    return {"message": f"Feedback {feedback_id} deleted successfully"}
