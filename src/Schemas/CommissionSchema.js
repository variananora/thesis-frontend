const commissionSchema = {
  title: [
    {
      required: true,
      message: 'Please input your title!',
    },
    {
      min: 3,
      message: 'Title must be at least 3 characters long!',
    },
    {
      max: 50,
      message: 'Title must be at most 50 characters long!',
    },
  ],
  category: [
    {
      required: true,
      message: 'Please input your category!',
    },
  ],
  cover: [
    {
      required: true,
      message: 'Please input your cover image!',
    },
  ],
  images: [
    {
      required: true,
      message: 'Please input your images!',
    },
  ],
  description: [
    {
      required: true,
      message: 'Please input your description!',
    },
  ],
  shortTitle: [
    {
      required: true,
      message: 'Please input your service title!',
    },
  ],
  shortDescription: [
    {
      required: true,
      message: 'Please input your short description!',
    },
  ],
  deliveryTime: [
    {
      required: true,
      message: 'Please input your delivery time!',
    },
    {
      type: 'number',
      min: 1,
      max: 30,
      message: 'Delivery time must be between 1 and 30 days!',
    },
  ],
  revisionNumber: [
    {
      required: true,
      message: 'Please input your revision time!',
    },
    {
      type: 'number',
      min: 0,
      max: 10,
      message: 'Revision number must be between 0 and 10!',
    },
  ],
  features: [
    {
      required: true,
      message: 'Please input your features!',
    },
    {
      type: 'array',
      min: 1,
      max: 10,
      message: 'Features must be between 1 and 10!',
    },
  ],
  price: [
    {
      required: true,
      message: 'Please input your price!',
    },
    {
      type: 'number',
      min: 1,
      max: 100000000,
      message: 'Price must be between IDR 1 and IDR 100000000!',
    },
  ],
};

export default commissionSchema;
