import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import StarRating from '../components/StarRating.jsx';

export default function FeedbackDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await feedbackService.getById(id);
        setFeedback(data);
      } catch (err) {
        setError(err?.response?.data?.detail || 'Feedback not found.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  async function handleDelete() {
    if (!window.confirm('Delete this feedback entry? This cannot be undone.')) return;
    try {
      await feedbackService.remove(id);
      navigate('/feedback');
    } catch (err) {
      setError(err?.response?.data?.detail || 'Could not delete feedback.');
    }
  }

  if (loading) return <p className="muted">Loading…</p>;
  if (error) return <p className="error">{error}</p>;
  if (!feedback) return null;

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Feedback #{feedback.feedback_id}</h1>
          <p className="muted">Submitted by {feedback.participant_name}</p>
        </div>
        <div className="button-row">
          <Link className="btn" to={`/feedback/${feedback.feedback_id}/edit`}>Edit</Link>
          <button className="btn btn-danger" onClick={handleDelete}>Delete</button>
        </div>
      </header>

      <div className="card">
        <dl className="detail-list">
          <div>
            <dt>Program</dt>
            <dd>{feedback.program_name}</dd>
          </div>
          <div>
            <dt>Rating</dt>
            <dd><StarRating value={feedback.rating} /></dd>
          </div>
          <div>
            <dt>Submitted</dt>
            <dd>{new Date(feedback.submitted_at).toLocaleString()}</dd>
          </div>
          <div>
            <dt>Comments</dt>
            <dd>{feedback.comments || <span className="muted">No comments provided.</span>}</dd>
          </div>
        </dl>
      </div>

      <Link to="/feedback" className="btn-link">← Back to all feedback</Link>
    </section>
  );
}
