import {
  Button, Descriptions, Image, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { bufferToBase64ImageUrl, imageFallback } from '../../Utils/ImageUtils';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';

const ViewProfile = ({ data }) => {
  const currentUser = getCurrentUser();
  const isUserMatched = currentUser._id === data._id;

  return (
    <>
      <Typography.Title level={4}>
        {data?.username}
        {' '}
        Profile
      </Typography.Title>
      <Image
        alt={data?.name}
        style={{
          height: '20vh',
          width: '20vh',
          objectFit: 'cover',
        }}
        src={bufferToBase64ImageUrl(
          data?.image?.image?.data,
          data?.image?.image?.mimetype,
        )}
        fallback={imageFallback}
      />
      <Descriptions>
        <Descriptions.Item label="Email" span={3}>
          {data?.email}
        </Descriptions.Item>
        <Descriptions.Item label="Phone" span={3}>
          {data?.phone}
        </Descriptions.Item>
      </Descriptions>
      {isUserMatched && (
        <Link to="/edit-profile">
          <Button type="primary">
            Edit Profile
          </Button>
        </Link>
      )}
    </>
  );
};
ViewProfile.propTypes = {
  data: PropTypes.object,
};

ViewProfile.defaultProps = {
  data: {},
};

export default ViewProfile;
