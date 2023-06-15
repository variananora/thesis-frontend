import { generateImageFormValueBuffer } from './ImageConstants';

export const registerUserInitialValues = {
  username: '',
  email: '',
  password: '',
  phone: '',
  image: [],
  description: '',
  isSeller: false,
};

export const loginUserInitialValues = {
  username: '',
  password: '',
};

export const editUserInitialValues = (user) => ({
  username: user?.username,
  email: user?.email,
  phone: user?.phone || '',
  image: generateImageFormValueBuffer(user?.image),
  description: user?.description || '',
});
