export const getAccessToken = () => localStorage.getItem('deli_access');
export const getRefreshToken = () => localStorage.getItem('deli_refresh');

export const setAccessToken = (token) => localStorage.setItem('deli_access', token);
export const setRefreshToken = (token) => localStorage.setItem('deli_refresh', token);

export const clearTokens = () => {
  localStorage.removeItem('deli_access');
  localStorage.removeItem('deli_refresh');
};

export const isTokenExpired = (token) => {
  try {
    if (!token) return true; // No token means expired
    const payload = JSON.parse(atob(token.split('.')[1])); // Decode the JWT payload
    const exp = payload.exp; // Expiration time in seconds (Unix timestamp)
    const now = Math.floor(Date.now() / 1000); // Current time in seconds

    return exp < now; // Returns true if token is expired, false otherwise
  } catch (error) {
    console.error("Invalid token", error);
    return true; // Treat invalid tokens as expired
  }
}