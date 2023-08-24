import { ClockCircleOutlined, SyncOutlined } from '@ant-design/icons';
import {
  Button, Card, Image, Rate, Space, Typography,
} from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { moneyFormatter } from '../../../Utils/CommonUtils';
import { bufferToBase64ImageUrl } from '../../../Utils/ImageUtils';
import { getCurrentUser } from '../../../Utils/LocalStorageUtils';
import MessageUserModal from '../../MessageUserModal/MessageUserModal';

const CommissionViewOrderSection = ({
  data,
  isLoading,
  doOrder,
}) => {
  const currentUser = getCurrentUser();
  const isCurrentUserCreator = data?.userId === currentUser?._id;

  const star = !Number.isNaN(data.totalStars / data.starNumber)
    ? Math.round(data.totalStars / data.starNumber)
    : 0;

  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
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
          {moneyFormatter(data?.price)}
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
          onClick={doOrder}
          disabled={isCurrentUserCreator}
        >
          Order Now
        </Button>
        <Button
          block
          style={{ marginTop: '1rem' }}
          onClick={() => setIsVisible(true)}
          disabled={isCurrentUserCreator}
        >
          Message
        </Button>
      </Card>
      <MessageUserModal
        receiver={data?.userId}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      />
    </>
  );
};

CommissionViewOrderSection.propTypes = {
  data: PropTypes.object,
  isLoading: PropTypes.bool,
  doOrder: PropTypes.func,
};

CommissionViewOrderSection.defaultProps = {
  data: {},
  isLoading: false,
  doOrder: noop,
};

export default CommissionViewOrderSection;
