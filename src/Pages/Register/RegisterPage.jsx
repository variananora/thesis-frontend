import { Button, Form, message } from 'antd';
import { isEmpty } from 'lodash';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../Components/ProfileForm/ProfileForm';
import { registerUserInitialValues } from '../../Constants/UserConstants';
import { registerUserService } from '../../Services/AuthenticationServices';
import { generateFormData } from '../../Utils/UploadUtils';

const RegisterPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const skipKeys = ['image'];
      const formData = generateFormData(values, skipKeys);
      if (!isEmpty(values.image)) {
        formData.append('image', values.image[0].originFileObj);
      }
      await registerUserService(formData);
      message.success('User registered successfully! You can now login.');
      navigate('/login');
    } catch (error) {
      message.error(error.data.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <div className="register-page" id="register-page">
      <div className="title">
        <h1>Register</h1>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={registerUserInitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <ProfileForm />
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Register
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default RegisterPage;
