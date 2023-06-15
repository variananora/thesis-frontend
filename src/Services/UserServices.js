import { USER_API } from '../Constants/BackendApis';
import axiosHelper from '../Utils/AxiosHelper';

const updateUserService = async (body) => axiosHelper.put(USER_API, body);

export default updateUserService;
