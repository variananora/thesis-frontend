const userSchema = {
  username: [
    {
      required: true,
      message: 'Please input your username!',
    },
    {
      whitespace: true,
      message: 'Username cannot contain spaces!',
    },
    {
      type: 'string',
      min: 4,
      max: 20,
      message: 'Username must be between 4 and 20 characters long!',
    },
    {
      pattern: /^[a-zA-Z0-9]+$/,
      message: 'Username must contain only letters and numbers!',
    },
  ],
  email: [
    {
      required: true,
      message: 'Please enter your email address!',
    },
    {
      type: 'email',
      message: 'Please enter a valid email address!',
    },
  ],
  password: [
    {
      required: true,
      message: 'Please input your password!',
    },
    {
      type: 'string',
      min: 8,
      max: 20,
      message: 'Password must be between 8 and 20 characters long!',
    },
    {
      pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}$/,
      message: 'Password must contain at least one uppercase letter, one lowercase letter and one number!',
    },
  ],
  phone: [],
  image: [],
  description: [],
  isCreator: [],
};

export default userSchema;
