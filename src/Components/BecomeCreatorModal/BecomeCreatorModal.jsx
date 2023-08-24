import {
  Button, Form, message, Modal, Space,
} from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { USER_API } from '../../Constants/BackendApis';
import { becomeCreatorInitialValues } from '../../Constants/UserConstants';
import axiosHelper from '../../Utils/AxiosHelper';
import { setCurrentUser } from '../../Utils/LocalStorageUtils';
import CreatorProfileForm from '../CreatorProfileForm/CreatorProfileForm';

const BecomeCreatorModal = ({
  isVisible,
  setIsVisible,
}) => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const { data: userData } = await axiosHelper.post(`${USER_API}/become-creator`, values);
      setCurrentUser(userData);
      navigate('/creator/dashboard');
      message.success('You are now a creator!');
      setIsVisible(false);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <Modal
      open={isVisible}
      title="Become a Creator"
      onCancel={() => setIsVisible(false)}
      footer={null}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={becomeCreatorInitialValues}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <CreatorProfileForm />
        <Space
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
          }}
        >
          <Form.Item>
            <Button onClick={() => setIsVisible(false)}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Become a Creator
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </Modal>
  );
};

BecomeCreatorModal.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

BecomeCreatorModal.defaultProps = {
  isVisible: false,
  setIsVisible: noop,
};

export default BecomeCreatorModal;
