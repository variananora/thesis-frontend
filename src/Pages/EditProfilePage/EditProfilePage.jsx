import { useQuery } from '@tanstack/react-query';
import {
  Button, Form, message, Spin,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import ProfileForm from '../../Components/ProfileForm/ProfileForm';
import { USER_API } from '../../Constants/BackendApis';
import { editUserInitialValues } from '../../Constants/UserConstants';
import updateUserService from '../../Services/UserServices';
import axiosHelper from '../../Utils/AxiosHelper';
import { getCurrentUser, setCurrentUser } from '../../Utils/LocalStorageUtils';
import { generateFormData } from '../../Utils/UploadUtils';

const EditProfilePage = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const { isLoading, data, refetch } = useQuery({
    queryKey: ['view-profile', currentUser._id],
    queryFn: () => axiosHelper
      .get(`${USER_API}/${currentUser._id}`)
      .then((res) => res.data),
  });

  const onFinish = async (values) => {
    try {
      const skipKeys = ['image'];
      const formData = generateFormData(values, skipKeys);
      if (values.image[0] instanceof File) {
        formData.append('image', values.image[0].originFileObj);
      }
      await updateUserService(formData);
      const { image, ...newValues } = values;
      const updatedUser = { ...data, ...newValues };
      setCurrentUser(updatedUser);
      message.success('User updated successfully!');
      await refetch();
      navigate(`/profile/${data._id}`);
    } catch (error) {
      message.error(error.data.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <div className="edit-profile-page" id="edit-profile-page">
      <div className="title">
        <h1>Edit Profile</h1>
      </div>
      <Spin spinning={isLoading}>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={editUserInitialValues(data)}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <ProfileForm isEditMode />
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              Update
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default EditProfilePage;
