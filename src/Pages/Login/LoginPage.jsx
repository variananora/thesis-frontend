import {
  Button, Form, Input, message,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { loginUserInitialValues } from '../../Constants/UserConstants';
import userSchema from '../../Schemas/UserSchema';
import { loginUserService } from '../../Services/AuthenticationServices';
import { setCurrentUser } from '../../Utils/LocalStorageUtils';

const LoginPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data: userData } = await loginUserService(values);
      setCurrentUser(userData);
      navigate('/');
      message.success('You are now logged in!');
    } catch (error) {
      message.error(error.response.data.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <div className="login-page" id="login-page">
      <div className="title">
        <h1>Login</h1>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={loginUserInitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={userSchema.username}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={userSchema.password}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
