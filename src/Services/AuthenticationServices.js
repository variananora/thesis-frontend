import axios from 'axios';
import {
  CHECK_TOKEN_API,
  LOGIN_API,
  REGISTER_API,
  USER_DETAIL_API,
} from '../Constants/AuthenticationApis';

export const login = async (username, password) => {
  const body = { username, password };
  return axios.post(LOGIN_API, body);
};

export const register = async (body) => axios.post(REGISTER_API, body);

export const checkToken = async (token) => {
  const body = { token };
  return axios.post(CHECK_TOKEN_API, body);
};

export const userDetail = async (token) => {
  const body = { token };
  return axios.post(USER_DETAIL_API, body);
};
