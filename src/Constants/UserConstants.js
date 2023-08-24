import { generateImageFormValueBuffer } from './ImageConstants';

export const registerUserInitialValues = {
  username: '',
  email: '',
  password: '',
  phone: '',
  image: [],
  description: '',
  isCreator: false,
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

export const becomeCreatorInitialValues = {
  description: '',
  bankCode: '',
  accountNumber: '',
  accountHolderName: '',
};

export const editCreatorInitialValues = (creator) => ({
  description: creator?.description || '',
  bankCode: creator?.bankDetails?.bankCode || '',
  accountNumber: creator?.bankDetails?.accountNumber || '',
  accountHolderName: creator?.bankDetails?.accountHolderName || '',
});
