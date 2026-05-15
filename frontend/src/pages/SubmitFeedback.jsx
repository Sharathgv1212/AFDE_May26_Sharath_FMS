import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackForm from '../components/FeedbackForm.jsx';

export default function SubmitFeedback() {
  const navigate = useNavigate();
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  async function handleSubmit(payload) {
    try {
      setSubmitting(true);
      setError('');
      const created = await feedbackService.create(payload);
      setSuccess(`Thanks ${created.participant_name}! Your feedback has been recorded.`);
      setTimeout(() => navigate(`/feedback/${created.feedback_id}`), 900);
    } catch (err) {
      const detail = err?.response?.data?.detail;
      setError(typeof detail === 'string' ? detail : 'Could not submit feedback. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Submit Feedback</h1>
          <p className="muted">Tell us about your experience.</p>
        </div>
      </header>

      <div className="card">
        {success && <div className="alert alert-success">{success}</div>}
        {error && <div className="alert alert-error">{error}</div>}
        <FeedbackForm onSubmit={handleSubmit} submitting={submitting} submitLabel="Submit Feedback" />
      </div>
    </section>
  );
}
