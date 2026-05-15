"""
CRUD operations for the Feedback model. Keeping DB logic in a dedicated
layer makes the router slim and the code easier to test.
"""
from typing import Optional

from sqlalchemy import func, or_
from sqlalchemy.orm import Session

from . import models, schemas


def get_feedback(db: Session, feedback_id: int) -> Optional[models.Feedback]:
    return db.query(models.Feedback).filter(models.Feedback.feedback_id == feedback_id).first()


def list_feedback(
    db: Session,
    skip: int = 0,
    limit: int = 100,
    rating: Optional[int] = None,
    program: Optional[str] = None,
) -> list[models.Feedback]:
    query = db.query(models.Feedback)
    if rating is not None:
        query = query.filter(models.Feedback.rating == rating)
    if program:
        query = query.filter(models.Feedback.program_name.ilike(f"%{program}%"))
    return query.order_by(models.Feedback.submitted_at.desc()).offset(skip).limit(limit).all()


def search_feedback(
    db: Session,
    keyword: Optional[str] = None,
    rating: Optional[int] = None,
    program: Optional[str] = None,
) -> list[models.Feedback]:
    """Keyword search across participant_name, program_name, comments — combinable with filters."""
    query = db.query(models.Feedback)
    if keyword:
        pattern = f"%{keyword}%"
        query = query.filter(
            or_(
                models.Feedback.participant_name.ilike(pattern),
                models.Feedback.program_name.ilike(pattern),
                models.Feedback.comments.ilike(pattern),
            )
        )
    if rating is not None:
        query = query.filter(models.Feedback.rating == rating)
    if program:
        query = query.filter(models.Feedback.program_name.ilike(f"%{program}%"))
    return query.order_by(models.Feedback.submitted_at.desc()).all()


def create_feedback(db: Session, payload: schemas.FeedbackCreate) -> models.Feedback:
    db_feedback = models.Feedback(**payload.model_dump())
    db.add(db_feedback)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def update_feedback(
    db: Session, feedback_id: int, payload: schemas.FeedbackUpdate
) -> Optional[models.Feedback]:
    db_feedback = get_feedback(db, feedback_id)
    if not db_feedback:
        return None
    update_data = payload.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_feedback, field, value)
    db.commit()
    db.refresh(db_feedback)
    return db_feedback


def delete_feedback(db: Session, feedback_id: int) -> bool:
    db_feedback = get_feedback(db, feedback_id)
    if not db_feedback:
        return False
    db.delete(db_feedback)
    db.commit()
    return True


def get_stats(db: Session) -> dict:
    total = db.query(func.count(models.Feedback.feedback_id)).scalar() or 0
    avg = db.query(func.avg(models.Feedback.rating)).scalar() or 0.0
    distribution = {i: 0 for i in range(1, 6)}
    rows = (
        db.query(models.Feedback.rating, func.count(models.Feedback.feedback_id))
        .group_by(models.Feedback.rating)
        .all()
    )
    for rating_value, count in rows:
        distribution[rating_value] = count
    return {
        "total_feedback": total,
        "average_rating": round(float(avg), 2),
        "rating_distribution": distribution,
    }
