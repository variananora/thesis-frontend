import { Card, Typography } from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';
import UserAvatar from '../UserAvatar/UserAvatar';

const ConversationList = ({
  conversation,
  onClick,
}) => {
  const currentUser = getCurrentUser();
  const sender = conversation?.participants
    .find((participant) => participant?._id !== currentUser?._id);
  const receiver = conversation?.participants
    .find((participant) => participant?._id === currentUser?._id);

  const lastMessageUser = conversation?.lastMessage?.userId === sender?._id ? sender : receiver;

  return (
    <Card
      onClick={() => onClick(conversation)}
      hoverable
      style={{
        marginTop: '0.5rem',
        marginBottom: '0.5rem',
        width: '100%',
      }}
    >
      <Card.Meta
        title={sender?.username}
        description={(
          <Typography.Text
            ellipsis
            type="secondary"
          >
            {lastMessageUser?.username}
            :
            {' '}
            {conversation?.lastMessage?.message}
          </Typography.Text>
        )}
        avatar={(
          <UserAvatar
            image={sender?.image}
            size="large"
          />
        )}
      />
      <Typography.Title
        level={5}
        style={{ margin: 0 }}
      />
    </Card>
  );
};

ConversationList.propTypes = {
  conversation: PropTypes.object,
  onClick: PropTypes.func,
};

ConversationList.defaultProps = {
  conversation: {},
  onClick: noop,
};

export default ConversationList;
