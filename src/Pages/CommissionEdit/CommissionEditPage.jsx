import { useQuery } from '@tanstack/react-query';
import {
  Button, Form, message, Spin, Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CommissionFormDetailSection
  from '../../Components/CommissionForm/CommissionFormDetailSection/CommissionFormDetailSection';
import CommissionFormInfoSection
  from '../../Components/CommissionForm/CommissionFormInfoSection/CommissionFormInfoSection';
import { COMMISSION_API } from '../../Constants/BackendApis';
import { editCommissionInitialValues } from '../../Constants/CommissionConstants';
import { createCommissionService } from '../../Services/CommissionServices';
import axiosHelper from '../../Utils/AxiosHelper';
import {
  appendArrayToFormData,
  appendImagesToFormData,
  appendImageToFormData,
  generateFormData,
} from '../../Utils/UploadUtils';

const CommissionEditPage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { isLoading, data } = useQuery({
    queryKey: ['commission', id],
    queryFn: () => axiosHelper
      .get(`${COMMISSION_API}/${id}`)
      .then((res) => res.data),
  });

  console.log({ data });

  const onFinish = async (values) => {
    try {
      const skipKeys = ['images', 'cover', 'features'];
      const formData = generateFormData(values, skipKeys);
      appendArrayToFormData(formData, 'features[]', values.features);
      appendImageToFormData(formData, 'cover', values.cover[0]);
      appendImagesToFormData(formData, 'images[]', values.images);

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
    <div className="commission-edit">
      <Spin spinning={isLoading}>
        <div className="sections">
          <div className="header">
            <Typography.Title level={3}>
              Edit Commission
            </Typography.Title>
          </div>
          <div className="content">
            <Form
              name="basic"
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
              style={{ maxWidth: 600 }}
              initialValues={editCommissionInitialValues(data)}
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
                  Update Commission
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Spin>
    </div>
  );
};

export default CommissionEditPage;
