import { Form, InputNumber, Select } from 'antd';
import commissionSchema from '../../../Schemas/CommissionSchema';

const { Option } = Select;

const CommissionFormDetailSection = () => (
  <>
    <Form.Item
      label="Delivery Time (in days)"
      name="deliveryTime"
      rules={commissionSchema.deliveryTime}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item
      label="Revision Number (in times)"
      name="revisionNumber"
      rules={commissionSchema.revisionNumber}
    >
      <InputNumber />
    </Form.Item>
    <Form.Item
      label="Features/Tags"
      name="features"
      rules={commissionSchema.features}
    >
      <Select
        mode="tags"
        showSearch
      >
        <Option value="design">Design</Option>
        <Option value="web">Web Development</Option>
        <Option value="animation">Animation</Option>
      </Select>
    </Form.Item>
  </>
);

export default CommissionFormDetailSection;
