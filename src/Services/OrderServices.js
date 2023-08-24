import { ORDER_API } from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

export const createOrder = async (commissionId) => axiosHelper.post(`${ORDER_API}/${commissionId}`);

export const updateOrderPaymentStatus = async (orderId) => axiosHelper.put(`${ORDER_API}/confirm/${orderId}`);
