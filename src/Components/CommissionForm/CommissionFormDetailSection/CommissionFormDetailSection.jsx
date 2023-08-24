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
      <InputNumber
        placeholder="Input delivery time here"
      />
    </Form.Item>
    <Form.Item
      label="Revision Number (in times)"
      name="revisionNumber"
      rules={commissionSchema.revisionNumber}
    >
      <InputNumber
        placeholder="Input revision number here"
      />
    </Form.Item>
    <Form.Item
      label="Tags"
      name="features"
      rules={commissionSchema.features}
    >
      <Select
        mode="tags"
        showSearch
        placeholder="Input features/tags here"
      >
        <Option value="design">Design</Option>
        <Option value="animation">Animation</Option>
        <Option value="portrait">Portrait</Option>
      </Select>
    </Form.Item>
  </>
);

export default CommissionFormDetailSection;
