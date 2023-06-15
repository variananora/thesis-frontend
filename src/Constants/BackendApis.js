import env from 'react-dotenv';

export const AUTHENTICATION_API = `${env.BACKEND_API_URL}/auth`;

export const LOGIN_API = `${AUTHENTICATION_API}/login`;

export const REGISTER_API = `${AUTHENTICATION_API}/register`;

export const LOGOUT_API = `${AUTHENTICATION_API}/logout`;

export const COMMISSION_API = `${env.BACKEND_API_URL}/commission`;

export const IMAGE_API = `${env.BACKEND_API_URL}/image`;

export const USER_API = `${env.BACKEND_API_URL}/user`;

export const REVIEW_API = `${env.BACKEND_API_URL}/review`;
