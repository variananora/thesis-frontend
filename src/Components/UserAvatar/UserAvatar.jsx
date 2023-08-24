import { UserOutlined } from '@ant-design/icons';
import { Avatar } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { base64ImageUrl } from '../../Utils/ImageUtils';

const UserAvatar = ({
  image,
  size,
  shape,
}) => {
  if (!isEmpty(image)) {
    return (
      <Avatar
        size={size}
        shape={shape}
        src={base64ImageUrl(
          image?.image?.data,
          image?.image?.mimetype,
        )}
      />
    );
  }

  return (
    <Avatar
      icon={<UserOutlined />}
      size={size}
      shape={shape}
    />
  );
};

UserAvatar.propTypes = {
  image: PropTypes.object,
  size: PropTypes.string,
  shape: PropTypes.string,
};

UserAvatar.defaultProps = {
  image: {},
  size: 'default',
  shape: 'circle',
};

export default UserAvatar;
