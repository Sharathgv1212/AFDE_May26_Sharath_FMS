"""
SQLAlchemy ORM models for the Feedback Management System.
"""
from datetime import datetime

from sqlalchemy import Column, DateTime, Integer, String, Text

from .db import Base


class Feedback(Base):
    """Represents a single feedback entry from a participant."""

    __tablename__ = "feedback"

    feedback_id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    participant_name = Column(String(120), nullable=False, index=True)
    program_name = Column(String(120), nullable=False, index=True)
    rating = Column(Integer, nullable=False)
    comments = Column(Text, nullable=True)
    submitted_at = Column(DateTime, default=datetime.utcnow, nullable=False)
