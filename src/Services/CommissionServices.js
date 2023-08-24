import { COMMISSION_API } from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

export const createCommissionService = async (body) => axiosHelper.post(COMMISSION_API, body);

export const editCommissionService = async (commissionId, body) => axiosHelper.put(`${COMMISSION_API}/${commissionId}`, body);

export const deleteCommissionService = async (commissionId) => axiosHelper.delete(`${COMMISSION_API}/${commissionId}`);
