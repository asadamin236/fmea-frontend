// API Configuration
export const API_BASE_URL = "https://fmea-backend.vercel.app";

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  LOGIN: `${API_BASE_URL}/api/auth/login`,
  SIGNUP: `${API_BASE_URL}/api/auth/signup`,
  FORGOT_PASSWORD: `${API_BASE_URL}/api/auth/forgot-password`,
  RESET_PASSWORD: `${API_BASE_URL}/api/auth/reset-password`,
  
  // Users
  USERS: `${API_BASE_URL}/api/users`,
  
  // Teams
  TEAMS: `${API_BASE_URL}/api/teams`,
  
  // Components
  COMPONENTS: `${API_BASE_URL}/api/components`,
  
  // Equipment
  EQUIPMENT_CLASS: `${API_BASE_URL}/api/equipment-class`,
  EQUIPMENT_TYPES: `${API_BASE_URL}/api/equipment-types`,
  
  // Manufacturers
  MANUFACTURERS: `${API_BASE_URL}/api/manufacturers`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/`,
  DB_STATUS: `${API_BASE_URL}/db-status`,
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("fmea_token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function for API calls
export const apiCall = async (url: string, options: RequestInit = {}) => {
  const headers = getAuthHeaders();
  
  const response = await fetch(url, {
    ...options,
    headers: {
      ...headers,
      ...options.headers,
    },
  });
  
  const data = await response.json();
  
  if (!response.ok) {
    throw new Error(data.error || `HTTP error! status: ${response.status}`);
  }
  
  return data;
}; 