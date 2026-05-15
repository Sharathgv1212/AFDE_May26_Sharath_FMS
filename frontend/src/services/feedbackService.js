/**
 * Feedback service — wraps every backend endpoint into a typed-ish JS function.
 * Components only call these — never axios directly. Makes URL changes and
 * error handling a single-point change.
 */
import api from '../api.js';

export const feedbackService = {
  async getAll(params = {}) {
    const { data } = await api.get('/feedback', { params });
    return data;
  },

  async getById(id) {
    const { data } = await api.get(`/feedback/${id}`);
    return data;
  },

  async create(payload) {
    const { data } = await api.post('/feedback', payload);
    return data;
  },

  async update(id, payload) {
    const { data } = await api.put(`/feedback/${id}`, payload);
    return data;
  },

  async remove(id) {
    const { data } = await api.delete(`/feedback/${id}`);
    return data;
  },

  async search(params = {}) {
    const { data } = await api.get('/search', { params });
    return data;
  },

  async getStats() {
    const { data } = await api.get('/feedback/stats');
    return data;
  },
};
