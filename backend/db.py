"""
Database configuration for the Feedback Management System.

Uses SQLAlchemy with SQLite. The database file `feedback.db` is created in
the backend folder on first run.

Note: This file is named `db.py` (not `database.py`) to avoid a name
collision with the top-level `database/` folder, which contains the
schema script. If a module were named `database`, importing it from the
project root would pick up the folder instead of this file.
"""
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base

# Connection URL — SQLite stores data in a single file
SQLALCHEMY_DATABASE_URL = "sqlite:///./feedback.db"

# `check_same_thread` is set to False because SQLite by default
# only allows a connection to be used in the thread that created it.
# FastAPI may use multiple threads to handle requests.
engine = create_engine(
    SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False},
)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# Base class for all ORM models to inherit from
Base = declarative_base()


def get_db():
    """FastAPI dependency that provides a database session per-request.

    Ensures the session is closed even if an exception is raised.
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
