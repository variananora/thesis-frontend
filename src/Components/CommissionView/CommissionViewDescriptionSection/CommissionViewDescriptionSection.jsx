import {
  Card, Space, Tag, Typography,
} from 'antd';
import PropTypes from 'prop-types';

const CommissionViewDescriptionSection = ({ data, isLoading }) => (
  <Card loading={isLoading} style={{ marginTop: '1rem' }}>
    <Typography.Title level={5} style={{ marginTop: 0 }}>
      Description
    </Typography.Title>
    <Typography.Paragraph>
      {data?.description}
    </Typography.Paragraph>
    <Space>
      {data?.features.map((category) => (
        <Tag>{category}</Tag>
      ))}
    </Space>
  </Card>
);

CommissionViewDescriptionSection.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

CommissionViewDescriptionSection.defaultProps = {
  data: {
    features: [],
  },
  isLoading: false,
};

export default CommissionViewDescriptionSection;
