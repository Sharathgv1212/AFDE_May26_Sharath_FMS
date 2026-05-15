"""
Pydantic schemas used for request validation and response serialization.

Separating request and response schemas keeps the API contract explicit
and avoids leaking ORM internals.
"""
from datetime import datetime
from typing import Optional

from pydantic import BaseModel, Field, field_validator


class FeedbackBase(BaseModel):
    """Common fields shared between create and update schemas."""

    participant_name: str = Field(..., min_length=2, max_length=120)
    program_name: str = Field(..., min_length=2, max_length=120)
    rating: int = Field(..., ge=1, le=5, description="Rating between 1 (Poor) and 5 (Excellent)")
    comments: Optional[str] = Field(None, max_length=2000)

    @field_validator("participant_name", "program_name")
    @classmethod
    def strip_whitespace(cls, value: str) -> str:
        value = value.strip()
        if not value:
            raise ValueError("Field cannot be blank")
        return value


class FeedbackCreate(FeedbackBase):
    """Schema for POST /feedback."""


class FeedbackUpdate(BaseModel):
    """Schema for PUT /feedback/{id}. All fields optional for partial updates."""

    participant_name: Optional[str] = Field(None, min_length=2, max_length=120)
    program_name: Optional[str] = Field(None, min_length=2, max_length=120)
    rating: Optional[int] = Field(None, ge=1, le=5)
    comments: Optional[str] = Field(None, max_length=2000)


class FeedbackResponse(FeedbackBase):
    """Schema returned for any feedback retrieval."""

    feedback_id: int
    submitted_at: datetime

    model_config = {"from_attributes": True}


class FeedbackStats(BaseModel):
    """Aggregate statistics returned to the dashboard."""

    total_feedback: int
    average_rating: float
    rating_distribution: dict[int, int]
