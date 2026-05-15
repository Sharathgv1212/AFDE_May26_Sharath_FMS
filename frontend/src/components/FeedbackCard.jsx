import { Link } from 'react-router-dom';
import StarRating from './StarRating.jsx';

function formatDate(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString();
}

export default function FeedbackCard({ feedback }) {
  return (
    <div className="card feedback-card">
      <div className="feedback-head">
        <div>
          <h3>{feedback.participant_name}</h3>
          <p className="muted">{feedback.program_name}</p>
        </div>
        <StarRating value={feedback.rating} size="sm" />
      </div>
      {feedback.comments && <p className="feedback-comments">{feedback.comments}</p>}
      <div className="feedback-foot">
        <small className="muted">Submitted {formatDate(feedback.submitted_at)}</small>
        <Link to={`/feedback/${feedback.feedback_id}`} className="btn-link">
          View details →
        </Link>
      </div>
    </div>
  );
}
