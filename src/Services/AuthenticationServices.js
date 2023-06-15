import {
  LOGIN_API,
  LOGOUT_API,
  REGISTER_API,
} from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

export const loginUserService = async (body) => axiosHelper.post(LOGIN_API, body);

export const registerUserService = async (body) => axiosHelper.post(REGISTER_API, body);

export const logoutUserService = async () => axiosHelper.post(LOGOUT_API);
