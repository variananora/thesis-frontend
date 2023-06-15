import { COMMISSION_API } from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

export const createCommissionService = async (body) => axiosHelper.post(COMMISSION_API, body);

export const editCommissionService = async (body) => axiosHelper.put(COMMISSION_API, body);
