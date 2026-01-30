import axios from 'axios';

const API = axios.create({
    baseURL: 'http://localhost:8000',
});

export const fetchSummary = () => API.get('/analytics/summary');
export const fetchByCategory = () => API.get('/analytics/by-category');
export const fetchBySeverity = () => API.get('/analytics/by-severity');
export const fetchTimeSeries = () => API.get('/analytics/time-series');
export const fetchIncidents = () => API.get('/incidents');
export const createIncident = (data) => API.post('/incidents', data);