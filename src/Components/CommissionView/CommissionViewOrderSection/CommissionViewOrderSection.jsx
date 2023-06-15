import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import {
  Button, Card, Image, Rate, Space, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { bufferToBase64ImageUrl } from '../../../Utils/ImageUtils';

const CommissionViewOrderSection = ({ data, isLoading }) => {
  const star = !Number.isNaN(data.totalStars / data.starNumber)
    ? Math.round(data.totalStars / data.starNumber)
    : 0;

  return (
    <Card
      loading={isLoading}
      cover={(
        <Image
          alt={data?.name}
          style={{
            height: '40vh',
            objectFit: 'cover',
          }}
          src={bufferToBase64ImageUrl(
            data?.cover?.image?.data,
            data?.cover?.image?.mimetype,
          )}
        />
      )}
    >
      <Typography.Title
        level={3}
        style={{ textAlign: 'right' }}
      >
        $
        {data?.price}
      </Typography.Title>
      <Space>
        <span>
          <ClockCircleOutlined />
          <Typography.Text strong>
            {' '}
            {data?.deliveryTime}
            {' '}
            Days Delivery
          </Typography.Text>
        </span>
        <span>
          <SyncOutlined />
          <Typography.Text strong>
            {' '}
            {data?.revisionNumber}
            {' '}
            Revision
            {data?.revisionNumber > 1 ? 's' : ''}
          </Typography.Text>
        </span>
      </Space>
      <br />
      <span>
        <Rate disabled defaultValue={star} />
        {' '}
        (
        {data?.starNumber || 0}
        {' '}
        Sold)
      </span>
      <Button
        block
        type="primary"
        style={{ marginTop: '1rem' }}
      >
        Order Now
      </Button>
    </Card>
  );
};

CommissionViewOrderSection.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
};

CommissionViewOrderSection.defaultProps = {
  data: {},
  isLoading: false,
};

export default CommissionViewOrderSection;
