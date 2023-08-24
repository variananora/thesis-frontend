import { DeleteOutlined, EditOutlined, StarOutlined } from '@ant-design/icons';
import { Card, Space, Tag } from 'antd';
import PropTypes from 'prop-types';
import { Link, useLocation } from 'react-router-dom';
import { base64ImageUrl, bufferToBase64ImageUrl } from '../../Utils/ImageUtils';
import UserAvatar from '../UserAvatar/UserAvatar';

const { Meta } = Card;

const CommissionCard = ({
  commission,
  useConfig,
  useProfile,
  isDetail,
}) => {
  const location = useLocation();
  const isCreatorPage = location.pathname.includes('/creator');

  return (
    <Link to={isCreatorPage
      ? `/creator/commission/${commission?._id}`
      : `/commission/${commission?._id}`}
    >
      <Card
        hoverable
        cover={(
          <img
            alt={commission?.name}
            style={{
              height: '40vh',
              objectFit: 'cover',
            }}
            src={!isDetail
              ? base64ImageUrl(
                commission?.cover?.image?.data,
                commission?.cover?.image?.mimetype,
              ) : bufferToBase64ImageUrl(
                commission?.cover?.image?.data,
                commission?.cover?.image?.mimetype,
              )}
          />
        )}
        actions={useConfig && [
          <Link to={`/creator/edit-commission/${commission?._id}`}>
            <EditOutlined key="edit" />
          </Link>,
          <Link to={`/creator/delete-commission/${commission?._id}`}>
            <DeleteOutlined key="delete" />
          </Link>,
        ]}
      >
        <Meta
          title={commission?.title}
          description={(
            <Tag color="green" icon="IDR ">
              {commission?.price}
            </Tag>
          )}
        />
        <Space style={{ marginTop: '0.5rem' }}>
          <span>
            <StarOutlined />
            {' '}
            {!Number.isNaN(commission.totalStars / commission.starNumber)
              ? Math.round(commission.totalStars / commission.starNumber)
              : 0}
          </span>
          <span>
            (
            {commission?.sales || 0}
            {' '}
            Sold)
          </span>
        </Space>
        <br />
        {useProfile && (
          <Link to={`/profile/${commission?.userId?._id}`}>
            <Space style={{ marginTop: '0.5rem' }}>
              <UserAvatar image={commission?.userId?.image} />
              {commission?.userId?.username}
            </Space>
          </Link>
        )}
      </Card>
    </Link>
  );
};
CommissionCard.propTypes = {
  commission: PropTypes.object,
  useConfig: PropTypes.bool,
  useProfile: PropTypes.bool,
  isDetail: PropTypes.bool,
};

CommissionCard.defaultProps = {
  commission: {},
  useConfig: false,
  useProfile: true,
  isDetail: false,
};

export default CommissionCard;
