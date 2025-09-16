// API configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Helper function to construct API URLs
export const getApiUrl = (endpoint) => `${API_BASE_URL}${endpoint}`;