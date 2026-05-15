import { useEffect, useMemo, useState } from 'react';
import { feedbackService } from '../services/feedbackService.js';
import FeedbackCard from '../components/FeedbackCard.jsx';

export default function FeedbackList() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [keyword, setKeyword] = useState('');
  const [rating, setRating] = useState('');
  const [program, setProgram] = useState('');

  async function load(params = {}) {
    try {
      setLoading(true);
      setError('');
      const data = await feedbackService.search(params);
      setItems(data);
    } catch (err) {
      setError(err?.message || 'Unable to load feedback.');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
  }, []);

  function handleSearch(e) {
    e.preventDefault();
    const params = {};
    if (keyword.trim()) params.keyword = keyword.trim();
    if (rating) params.rating = Number(rating);
    if (program.trim()) params.program = program.trim();
    load(params);
  }

  function handleReset() {
    setKeyword('');
    setRating('');
    setProgram('');
    load();
  }

  const programs = useMemo(() => {
    const set = new Set(items.map((i) => i.program_name));
    return Array.from(set).sort();
  }, [items]);

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>All Feedback</h1>
          <p className="muted">{items.length} entries</p>
        </div>
      </header>

      <form className="card filter-bar" onSubmit={handleSearch}>
        <div className="filter-grid">
          <div>
            <label htmlFor="keyword">Keyword</label>
            <input
              id="keyword"
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search name, program, or comments"
            />
          </div>
          <div>
            <label htmlFor="rating">Rating</label>
            <select id="rating" value={rating} onChange={(e) => setRating(e.target.value)}>
              <option value="">Any</option>
              {[5, 4, 3, 2, 1].map((r) => (
                <option key={r} value={r}>{r} ★</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="program">Program</label>
            <input
              id="program"
              type="text"
              value={program}
              onChange={(e) => setProgram(e.target.value)}
              placeholder="e.g. FastAPI Workshop"
              list="program-list"
            />
            <datalist id="program-list">
              {programs.map((p) => <option key={p} value={p} />)}
            </datalist>
          </div>
          <div className="filter-buttons">
            <button type="submit" className="btn btn-primary">Search</button>
            <button type="button" className="btn" onClick={handleReset}>Reset</button>
          </div>
        </div>
      </form>

      {loading ? (
        <p className="muted">Loading…</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : items.length === 0 ? (
        <p className="muted">No matching feedback found.</p>
      ) : (
        <div className="grid grid-2">
          {items.map((fb) => (
            <FeedbackCard key={fb.feedback_id} feedback={fb} />
          ))}
        </div>
      )}
    </section>
  );
}
