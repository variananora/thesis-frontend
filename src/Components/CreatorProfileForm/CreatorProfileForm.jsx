import { Form, Input, Select } from 'antd';

const CreatorProfileForm = () => (
  <>
    <Form.Item
      label="Bio"
      name="description"
      rules={[{
        required: true,
        message: 'Please input your bio!',
      }]}
    >
      <Input.TextArea
        placeholder="Type your bio here..."
      />
    </Form.Item>
    <Form.Item
      label="Bank Name"
      name="bankCode"
      rules={[{
        required: true,
        message: 'Please select your bank name!',
      }]}
    >
      <Select
        placeholder="Select your bank name"
        allowClear
        options={[
          {
            label: 'BCA',
            value: 'bca',
          },
          {
            label: 'BNI',
            value: 'bni',
          },
          {
            label: 'BRI',
            value: 'bri',
          },
          {
            label: 'Mandiri',
            value: 'mandiri',
          },
          {
            label: 'CIMB',
            value: 'cimb',
          },
          {
            label: 'Danamon',
            value: 'danamon',
          },
          {
            label: 'Permata',
            value: 'permata',
          },
        ]}
      />
    </Form.Item>
    <Form.Item
      label="Account Number"
      name="accountNumber"
      rules={[{
        required: true,
        message: 'Please input your account number!',
      }]}
    >
      <Input
        placeholder="Type your account number here..."
      />
    </Form.Item>
    <Form.Item
      label="Account Holder Name"
      name="accountHolderName"
      rules={[{
        required: true,
        message: 'Please input your account holder name!',
      }]}
    >
      <Input
        placeholder="Type your account holder name here..."
      />
    </Form.Item>
  </>
);

export default CreatorProfileForm;
