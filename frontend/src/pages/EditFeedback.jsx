import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackForm from '../components/FeedbackForm.jsx';

export default function EditFeedback() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
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

  async function handleSubmit(payload) {
    try {
      setSubmitting(true);
      setError('');
      await feedbackService.update(id, payload);
      navigate(`/feedback/${id}`);
    } catch (err) {
      setError(err?.response?.data?.detail || 'Could not update feedback.');
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <p className="muted">Loading…</p>;
  if (!feedback) return <p className="error">{error || 'Not found.'}</p>;

  return (
    <section>
      <header className="page-header">
        <h1>Edit Feedback #{feedback.feedback_id}</h1>
      </header>
      <div className="card">
        {error && <div className="alert alert-error">{error}</div>}
        <FeedbackForm
          initialValue={feedback}
          onSubmit={handleSubmit}
          submitting={submitting}
          submitLabel="Save Changes"
        />
      </div>
    </section>
  );
}
