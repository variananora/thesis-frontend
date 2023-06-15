import axios from 'axios';
import env from 'react-dotenv';

const axiosHelper = axios.create({
  baseURL: env.BACKEND_API_URL,
  withCredentials: true,
});

export default axiosHelper;
