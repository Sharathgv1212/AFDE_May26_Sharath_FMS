-- =====================================================================
-- Feedback Management System — Database Schema (SQLite)
-- =====================================================================
-- This script creates the `feedback` table used by the FastAPI backend.
-- The backend creates this table automatically via SQLAlchemy on startup,
-- but this file is provided as the canonical, language-agnostic schema.
-- =====================================================================

DROP TABLE IF EXISTS feedback;

CREATE TABLE feedback (
    feedback_id      INTEGER PRIMARY KEY AUTOINCREMENT,
    participant_name VARCHAR(120) NOT NULL,
    program_name     VARCHAR(120) NOT NULL,
    rating           INTEGER      NOT NULL CHECK (rating BETWEEN 1 AND 5),
    comments         TEXT,
    submitted_at     DATETIME     NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_feedback_program  ON feedback (program_name);
CREATE INDEX idx_feedback_rating   ON feedback (rating);
CREATE INDEX idx_feedback_submitted ON feedback (submitted_at);

-- =====================================================================
-- Seed data — optional, useful for demo / screenshots
-- =====================================================================
INSERT INTO feedback (participant_name, program_name, rating, comments) VALUES
('Rahul Sharma',   'React Bootcamp',          5, 'Excellent hands-on sessions and very supportive mentors.'),
('Ananya Iyer',    'FastAPI Workshop',        4, 'Loved the depth of content. Wanted more on async patterns.'),
('Karthik Menon',  'SQL for Data Engineers',  3, 'Good content but pace was a little slow.'),
('Priya Nair',     'React Bootcamp',          4, 'Great structure. Capstone project was challenging in a good way.'),
('Vikram Singh',   'FastAPI Workshop',        5, 'Best workshop I have attended this year.'),
('Neha Reddy',     'Python Fundamentals',     2, 'Felt repetitive for someone with prior experience.'),
('Arjun Pillai',   'GenAI Foundations',       5, 'Mind-blowing examples. Want a follow-up advanced course.'),
('Sneha Bhat',     'SQL for Data Engineers',  4, 'Clear and well-paced. Hands-on labs were the best part.');
