import { Card, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import UserAvatar from '../UserAvatar/UserAvatar';

const ChatBubble = ({
  message,
  user,
  isCurrentUser,
}) => (
  <Card
    key={message?._id}
    style={{
      marginTop: '0.5rem',
      marginBottom: '0.5rem',
      textAlign: isCurrentUser ? 'right' : 'left',
    }}
  >
    {!isCurrentUser ? (
      <Space>
        <UserAvatar
          image={user?.image}
          size="small"
        />
        <Typography.Text>
          {message?.message}
        </Typography.Text>
      </Space>
    ) : (
      <Space>
        <Typography.Text>
          {message?.message}
        </Typography.Text>
        <UserAvatar
          image={user?.image}
          size="small"
        />
      </Space>
    )}
  </Card>
);

ChatBubble.propTypes = {
  message: PropTypes.object,
  user: PropTypes.object,
  isCurrentUser: PropTypes.bool,
};

ChatBubble.defaultProps = {
  message: {},
  user: {},
  isCurrentUser: false,
};

export default ChatBubble;
