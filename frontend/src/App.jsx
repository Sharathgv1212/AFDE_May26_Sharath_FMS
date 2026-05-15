import { NavLink, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard.jsx';
import SubmitFeedback from './pages/SubmitFeedback.jsx';
import FeedbackList from './pages/FeedbackList.jsx';
import FeedbackDetails from './pages/FeedbackDetails.jsx';
import EditFeedback from './pages/EditFeedback.jsx';

export default function App() {
  return (
    <div className="app">
      <header className="navbar">
        <div className="brand">
          <span className="logo">FMS</span>
          <span>Feedback Management System</span>
        </div>
        <nav>
          <NavLink to="/" end>Dashboard</NavLink>
          <NavLink to="/feedback">All Feedback</NavLink>
          <NavLink to="/submit">Submit Feedback</NavLink>
        </nav>
      </header>

      <main className="container">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/feedback" element={<FeedbackList />} />
          <Route path="/feedback/:id" element={<FeedbackDetails />} />
          <Route path="/feedback/:id/edit" element={<EditFeedback />} />
          <Route path="/submit" element={<SubmitFeedback />} />
          <Route path="*" element={<p>Page not found.</p>} />
        </Routes>
      </main>

      <footer className="footer">
        <small>Capstone Phase 1 · React + FastAPI + SQLite</small>
      </footer>
    </div>
  );
}
