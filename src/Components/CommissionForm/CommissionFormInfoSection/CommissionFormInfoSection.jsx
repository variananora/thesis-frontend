import { PlusOutlined } from '@ant-design/icons';
import {
  Form, Input, InputNumber, Select, Upload,
} from 'antd';
import commissionSchema from '../../../Schemas/CommissionSchema';
import { beforeUploadImage, normalizeUploadFile } from '../../../Utils/UploadUtils';

const { TextArea } = Input;

const CommissionFormInfoSection = () => (
  <>
    <Form.Item
      label="Title"
      name="title"
      rules={commissionSchema.title}
    >
      <Input
        placeholder="Your commission title here"
      />
    </Form.Item>
    <Form.Item
      label="Category"
      name="category"
      rules={commissionSchema.category}
    >
      <Select
        placeholder="Select a category"
        options={[
          {
            label: 'Design',
            value: 'design',
          },
          {
            label: 'Animation',
            value: 'animation',
          },
          {
            label: 'Portrait',
            value: 'portrait',
          },
        ]}
      />
    </Form.Item>
    <Form.Item
      label="Cover Image"
      name="cover"
      rules={commissionSchema.cover}
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
          <div style={{ marginTop: 8 }}>
            Upload
            <br />
            (Max 1)
          </div>
        </div>
      </Upload>
    </Form.Item>
    <Form.Item
      label="Images"
      name="images"
      rules={commissionSchema.images}
      valuePropName="fileList"
      getValueFromEvent={(value) => normalizeUploadFile(value)}
    >
      <Upload
        listType="picture-card"
        multiple
        maxCount={5}
        showUploadList
        beforeUpload={(file) => beforeUploadImage(file)}
      >
        <div>
          <PlusOutlined />
          <div style={{ marginTop: 8 }}>
            Upload
            <br />
            (Max 5)
          </div>
        </div>
      </Upload>
    </Form.Item>
    <Form.Item
      label="Description"
      name="description"
      rules={commissionSchema.description}
    >
      <TextArea
        placeholder="Your commission description here"
      />
    </Form.Item>
    <Form.Item
      label="Price (IDR)"
      name="price"
      rules={commissionSchema.price}
    >
      <InputNumber
        placeholder="Your commission price here"
      />
    </Form.Item>
  </>
);

export default CommissionFormInfoSection;
