import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  role?: string;
  // Add other JWT payload fields as needed
  exp?: number;
  iat?: number;
  [key: string]: unknown;
}

export const decodeToken = (): JwtPayload | null => {
  const token = localStorage.getItem("accessToken");
  if (!token) return null;

  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const isTokenExpired = (): boolean => {
  const payload = decodeToken();
  if (!payload?.exp) return true;
  
  // Check if the token is expired
  return Date.now() >= payload.exp * 1000;
};
