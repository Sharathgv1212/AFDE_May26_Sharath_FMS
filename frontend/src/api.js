/**
 * Axios instance pre-configured with the FastAPI base URL.
 * Override at runtime by setting VITE_API_URL in a .env file.
 */
import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL,
  headers: { 'Content-Type': 'application/json' },
});

export default api;
