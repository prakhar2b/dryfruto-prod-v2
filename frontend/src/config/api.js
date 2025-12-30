// Centralized API configuration for DryFruto
// Works both in development (with full URL) and production Docker (with relative path)

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || '';

// API base URL - uses relative path when BACKEND_URL is empty (Docker deployment)
export const API_BASE_URL = `${BACKEND_URL}/api`;

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return `${API_BASE_URL}${cleanEndpoint}`;
};

export default API_BASE_URL;
