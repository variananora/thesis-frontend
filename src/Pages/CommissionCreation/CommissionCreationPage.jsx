import {
  Button, Form, message, Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import CommissionFormDetailSection
  from '../../Components/CommissionForm/CommissionFormDetailSection/CommissionFormDetailSection';
import CommissionFormInfoSection
  from '../../Components/CommissionForm/CommissionFormInfoSection/CommissionFormInfoSection';
import { createCommissionInitialValues } from '../../Constants/CommissionConstants';
import { createCommissionService } from '../../Services/CommissionServices';

const CommissionCreationPage = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      const formData = new FormData();
      const skipKeys = ['images', 'cover', 'features'];
      Object.entries(values).forEach(([key, value]) => {
        if (!skipKeys.includes(key)) {
          formData.append(key, value);
        }
      });
      formData.append('cover', values.cover.fileList[0].originFileObj);
      values.images.fileList.forEach((file) => {
        formData.append('images', file.originFileObj);
      });
      values.features.forEach((item) => {
        formData.append('features[]', item);
      });

      const { data: createdCommission } = await createCommissionService(formData);
      message.success('CommissionViewPage created successfully!');
      navigate(`/commission/${createdCommission._id}`);
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const onFinishFailed = async () => {
    message.error('Please fill in all the fields!');
  };

  return (
    <div className="commission-creation">
      <div className="sections">
        <div className="header">
          <Typography.Title level={3}>
            Add New Commission
          </Typography.Title>
        </div>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={createCommissionInitialValues}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <CommissionFormInfoSection />
          <CommissionFormDetailSection />
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Create Commission
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default CommissionCreationPage;
