"""
Search endpoint - separate router so /search is a top-level path
as specified in the project requirements.
"""
from typing import Optional

from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session

from .. import crud, schemas
from ..db import get_db

router = APIRouter(prefix="/search", tags=["Search"])


@router.get("", response_model=list[schemas.FeedbackResponse])
def search(
    keyword: Optional[str] = Query(
        None,
        description="Free-text search across participant name, program name, and comments",
    ),
    rating: Optional[int] = Query(None, ge=1, le=5, description="Filter by exact rating 1-5"),
    program: Optional[str] = Query(None, description="Filter by program/training/event name"),
    db: Session = Depends(get_db),
):
    """Search feedback by keyword, rating, and/or program. All parameters are optional."""
    return crud.search_feedback(db, keyword=keyword, rating=rating, program=program)
