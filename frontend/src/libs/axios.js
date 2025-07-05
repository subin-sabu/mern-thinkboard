import axios from 'axios';

/* Important Note!!!*/
// In production, there's no localhost so we make this dynamic
const BASE_URL = import.meta.env.MODE === 'development' ? 'http://localhost:5001/api' : '/api'

const api = axios.create({
  baseURL: BASE_URL,
});

export default api;