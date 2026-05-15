import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { feedbackService } from '../services/feedbackService.js';
import StatCard from '../components/StatCard.jsx';
import FeedbackCard from '../components/FeedbackCard.jsx';

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [recent, setRecent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const [statsData, recentList] = await Promise.all([
          feedbackService.getStats(),
          feedbackService.getAll({ limit: 5 }),
        ]);
        setStats(statsData);
        setRecent(recentList);
      } catch (err) {
        setError(err?.message || 'Unable to load dashboard.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  if (loading) return <p className="muted">Loading dashboard…</p>;
  if (error) return <p className="error">{error}</p>;

  const distribution = stats?.rating_distribution || {};
  const maxCount = Math.max(1, ...Object.values(distribution));

  return (
    <section>
      <header className="page-header">
        <div>
          <h1>Dashboard</h1>
          <p className="muted">Snapshot of feedback collected so far.</p>
        </div>
        <Link to="/submit" className="btn btn-primary">+ Submit Feedback</Link>
      </header>

      <div className="grid grid-3">
        <StatCard label="Total Feedback" value={stats?.total_feedback ?? 0} />
        <StatCard
          label="Average Rating"
          value={stats?.average_rating ? `${stats.average_rating} / 5` : '—'}
          hint="Across all entries"
        />
        <StatCard
          label="Most Recent"
          value={recent[0]?.program_name || '—'}
          hint={recent[0]?.participant_name}
        />
      </div>

      <div className="card">
        <h2>Rating Distribution</h2>
        <div className="bar-chart">
          {[5, 4, 3, 2, 1].map((rating) => {
            const count = distribution[rating] || 0;
            const pct = (count / maxCount) * 100;
            return (
              <div className="bar-row" key={rating}>
                <span className="bar-label">{rating} ★</span>
                <div className="bar-track">
                  <div className="bar-fill" style={{ width: `${pct}%` }} />
                </div>
                <span className="bar-count">{count}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="page-header" style={{ marginTop: '2rem' }}>
        <h2>Recent Feedback</h2>
        <Link to="/feedback" className="btn-link">View all →</Link>
      </div>

      {recent.length === 0 ? (
        <p className="muted">No feedback yet. Be the first to submit one.</p>
      ) : (
        <div className="grid grid-2">
          {recent.map((fb) => (
            <FeedbackCard key={fb.feedback_id} feedback={fb} />
          ))}
        </div>
      )}
    </section>
  );
}
