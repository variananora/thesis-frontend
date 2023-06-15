import { message, Upload } from 'antd';

export const onRemoveImage = (file, fileList, setFileList) => {
  const index = fileList.indexOf(file);
  const newFileList = fileList.slice();
  newFileList.splice(index, 1);
  setFileList(newFileList);
  return true;
};

export const beforeUploadImage = (file) => {
  const imageFileType = [
    'image/png',
    'image/jpeg',
    'image/jpg',
  ];
  const isImageFileType = imageFileType.includes(file.type);

  if (!isImageFileType) {
    message.error(`${file.name} is not an image file`);
    return isImageFileType || Upload.LIST_IGNORE;
  }

  const isLt2M = file.size / 1024 / 1024 < 5;
  if (!isLt2M) {
    message.error('Image must smaller than 5MB!');
    return false;
  }

  return false;
};

export const normalizeUploadFile = (value) => {
  if (Array.isArray(value)) {
    return value;
  }
  return value?.fileList;
};

export const generateFormData = (values, skipKeys) => {
  const formData = new FormData();
  Object.entries(values).forEach(([key, value]) => {
    if (!skipKeys.includes(key)) {
      formData.append(key, value);
    }
  });

  return formData;
};

export const appendArrayToFormData = (formData, key, array) => {
  array.forEach((item) => {
    formData.append(`${key}[]`, item);
  });
};

export const appendImageToFormData = (formData, key, image) => {
  if (image instanceof File) {
    formData.append(key, image);
  }
};

export const appendImagesToFormData = (formData, key, images) => {
  images.forEach((image) => {
    appendImageToFormData(formData, key, image);
  });
};
