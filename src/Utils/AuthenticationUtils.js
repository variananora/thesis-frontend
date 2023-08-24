import { logoutUserService } from '../Services/AuthenticationServices';
import { removeCurrentUser } from './LocalStorageUtils';

const logoutUserUtils = async () => {
  removeCurrentUser();
  return logoutUserService();
};

export default logoutUserUtils;
