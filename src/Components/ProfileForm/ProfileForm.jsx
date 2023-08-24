import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Upload } from 'antd';
import PropTypes from 'prop-types';
import userSchema from '../../Schemas/UserSchema';
import { beforeUploadImage, normalizeUploadFile } from '../../Utils/UploadUtils';

const ProfileForm = ({ isEditMode }) => (
  <>
    <Form.Item
      label="Username"
      name="username"
    >
      <Input disabled={isEditMode} />
    </Form.Item>
    <Form.Item
      label="Email"
      name="email"
      rules={userSchema.email}
    >
      <Input disabled={isEditMode} />
    </Form.Item>
    {!isEditMode && (
      <Form.Item
        label="Password"
        name="password"
        rules={userSchema.password}
      >
        <Input.Password />
      </Form.Item>
    )}
    <Form.Item
      label="Phone"
      name="phone"
    >
      <Input />
    </Form.Item>
    <Form.Item
      label="Profile Picture"
      name="image"
      valuePropName="fileList"
      getValueFromEvent={(value) => normalizeUploadFile(value)}
    >
      <Upload
        name="avatar"
        listType="picture-card"
        className="avatar-uploader"
        showUploadList
        multiple={false}
        maxCount={1}
        beforeUpload={(file) => beforeUploadImage(file)}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>Upload</div>
        </div>
      </Upload>
    </Form.Item>
  </>
);

ProfileForm.propTypes = {
  isEditMode: PropTypes.bool,
};

ProfileForm.defaultProps = {
  isEditMode: false,
};

export default ProfileForm;
