import {
  Button, Form, message, Space,
} from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { USER_API } from '../../Constants/BackendApis';
import { editCreatorInitialValues } from '../../Constants/UserConstants';
import axiosHelper from '../../Utils/AxiosHelper';
import CreatorProfileForm from '../CreatorProfileForm/CreatorProfileForm';

const EditCreatorProfile = ({
  data,
  setIsEdit,
  refetch,
}) => {
  const onFinish = async (values) => {
    try {
      await axiosHelper.put(`${USER_API}/creator`, values);
      message.success('Profile has been updated!');
      refetch();
      setIsEdit(false);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={editCreatorInitialValues(data)}
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
            <Button onClick={() => setIsEdit(false)}>
              Cancel
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Update Profile
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </div>
  );
};

EditCreatorProfile.propTypes = {
  data: PropTypes.object,
  refetch: PropTypes.func,
  setIsEdit: PropTypes.func,
};

EditCreatorProfile.defaultProps = {
  data: {},
  refetch: noop,
  setIsEdit: noop,
};

export default EditCreatorProfile;
