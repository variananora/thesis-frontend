import env from 'react-dotenv';

const AUTHENTICATION_BASE_URL = `${env.AUTHENTICATION_API_URL}/auth`;

export const LOGIN_API = `${AUTHENTICATION_BASE_URL}/login`;

export const REGISTER_API = `${AUTHENTICATION_BASE_URL}/register`;

export const CHECK_TOKEN_API = `${AUTHENTICATION_BASE_URL}/check-token`;

export const USER_DETAIL_API = `${AUTHENTICATION_BASE_URL}/user-detail`;
