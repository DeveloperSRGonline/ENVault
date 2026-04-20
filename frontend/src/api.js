import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true, // IMPORTANT: Allows cookies (sessions) to be sent
});

export default api;