import { useState } from 'react';
import StarRating from './StarRating.jsx';

const RATING_LABELS = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Excellent',
};

const emptyState = {
  participant_name: '',
  program_name: '',
  rating: 0,
  comments: '',
};

export default function FeedbackForm({ initialValue, onSubmit, submitting, submitLabel = 'Submit' }) {
  const [form, setForm] = useState(initialValue || emptyState);
  const [errors, setErrors] = useState({});

  function update(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.participant_name || form.participant_name.trim().length < 2) {
      next.participant_name = 'Please enter your name (min 2 chars).';
    }
    if (!form.program_name || form.program_name.trim().length < 2) {
      next.program_name = 'Please enter the program/training/event name.';
    }
    if (!form.rating || form.rating < 1 || form.rating > 5) {
      next.rating = 'Please pick a rating between 1 and 5.';
    }
    if (form.comments && form.comments.length > 2000) {
      next.comments = 'Comments must be 2000 characters or fewer.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({
      ...form,
      participant_name: form.participant_name.trim(),
      program_name: form.program_name.trim(),
      comments: form.comments?.trim() || null,
    });
  }

  return (
    <form className="form" onSubmit={handleSubmit} noValidate>
      <div className="form-row">
        <label htmlFor="participant_name">Participant Name *</label>
        <input
          id="participant_name"
          type="text"
          value={form.participant_name}
          onChange={(e) => update('participant_name', e.target.value)}
          placeholder="Your full name"
          maxLength={120}
        />
        {errors.participant_name && <span className="error">{errors.participant_name}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="program_name">Training / Event / Product *</label>
        <input
          id="program_name"
          type="text"
          value={form.program_name}
          onChange={(e) => update('program_name', e.target.value)}
          placeholder="e.g. React Bootcamp"
          maxLength={120}
        />
        {errors.program_name && <span className="error">{errors.program_name}</span>}
      </div>

      <div className="form-row">
        <label>Rating *</label>
        <div className="rating-row">
          <StarRating value={form.rating} onChange={(v) => update('rating', v)} size="lg" />
          {form.rating > 0 && <span className="muted">{RATING_LABELS[form.rating]}</span>}
        </div>
        {errors.rating && <span className="error">{errors.rating}</span>}
      </div>

      <div className="form-row">
        <label htmlFor="comments">Comments</label>
        <textarea
          id="comments"
          rows={5}
          value={form.comments || ''}
          onChange={(e) => update('comments', e.target.value)}
          placeholder="Share what worked well and what could be improved."
          maxLength={2000}
        />
        {errors.comments && <span className="error">{errors.comments}</span>}
      </div>

      <button type="submit" className="btn btn-primary" disabled={submitting}>
        {submitting ? 'Saving…' : submitLabel}
      </button>
    </form>
  );
}
