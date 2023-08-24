import { base64ImageUrl, bufferToBase64ImageUrl } from '../Utils/ImageUtils';

export const generateImageFormValueBuffer = (image) => (image
  ? [{
    uid: image?._id,
    name: image?.name,
    status: 'done',
    url: bufferToBase64ImageUrl(image?.image?.data, image?.image?.mimetype),
  }]
  : []
);
export const generateImageFormValueBase64 = (image) => (image
  ? [{
    uid: image?._id,
    name: image?.name,
    status: 'done',
    url: base64ImageUrl(image?.image?.data, image?.image?.mimetype),
  }]
  : []
);

export const generateImagesFormValueBuffer = (images) => {
  if (Array.isArray(images)) {
    return images.map((image) => {
      const [imageForm] = generateImageFormValueBuffer(image);
      return imageForm;
    });
  }
  return [];
};

export const generateImagesFormValueBase64 = (images) => {
  if (Array.isArray(images)) {
    return images.map((image) => {
      const [imageForm] = generateImageFormValueBase64(image);
      return imageForm;
    });
  }
  return [];
};
