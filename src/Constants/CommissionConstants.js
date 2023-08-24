import { generateImageFormValueBuffer, generateImagesFormValueBuffer } from './ImageConstants';

export const createCommissionInitialValues = {
  title: '',
  category: null,
  cover: null,
  images: [],
  description: '',
  deliveryTime: 1,
  revisionNumber: 0,
  features: [],
  price: 0,
};

export const editCommissionInitialValues = (commission) => ({
  title: commission?.title,
  category: commission?.category,
  cover: generateImageFormValueBuffer(commission?.cover),
  images: generateImagesFormValueBuffer(commission?.images),
  description: commission?.description,
  deliveryTime: commission?.deliveryTime,
  revisionNumber: commission?.revisionNumber,
  features: commission?.features,
  price: commission?.price,
});
