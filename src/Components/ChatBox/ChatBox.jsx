import { useQuery } from '@tanstack/react-query';
import {
  Button, Card, Input, message, Skeleton, Space,
} from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { CONVERSATION_API } from '../../Constants/BackendApis';
import { updateConversationService } from '../../Services/ConversationServices';
import axiosHelper from '../../Utils/AxiosHelper';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';
import ChatBubble from '../ChatBubble/ChatBubble';

const ChatBox = ({
  conversationId,
  refetchList,
}) => {
  const [messages, setMessages] = useState('');

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['chat', conversationId],
    queryFn: () => axiosHelper
      .get(`${CONVERSATION_API}/${conversationId}`)
      .then((res) => res.data),
  });

  const currentUser = getCurrentUser();
  const sender = data?.participants
    ?.find((participant) => participant?._id !== currentUser?._id);
  const receiver = data?.participants
    ?.find((participant) => participant?._id === currentUser?._id);

  if (!conversationId) {
    return (
      <Card
        style={{
          height: '100%',
        }}
      >
        Please select a conversation
      </Card>
    );
  }

  const renderChats = () => {
    if (!data) {
      return (
        <>
          Empty chat
        </>
      );
    }
    return data?.messages?.map((userMessage) => (
      <ChatBubble
        key={userMessage?._id}
        message={userMessage}
        isCurrentUser={userMessage?.userId === currentUser?._id}
        user={userMessage?.userId !== currentUser?._id ? sender : receiver}
      />
    ));
  };

  const onSend = async () => {
    if (!messages) {
      return;
    }
    try {
      await updateConversationService(conversationId, messages);
      setMessages('');
      refetch();
      refetchList();
      message.success('Message sent');
    } catch (error) {
      message.error(error?.response?.data?.message);
    }
  };

  return (
    <Skeleton
      active
      loading={isLoading}
    >
      <Card
        style={{
          height: '60vh',
          overflowY: 'auto',
        }}
      >
        <div>
          {renderChats()}
        </div>
      </Card>
      <Card
        style={{
          height: '10vh',
        }}
        bodyStyle={{
          padding: '1rem 1rem',
        }}
      >
        <Space.Compact style={{ width: '100%' }}>
          <Input
            placeholder="Type a message..."
            onPressEnter={onSend}
            value={messages}
            onChange={(e) => setMessages(e.target.value)}
          />
          <Button
            type="primary"
            onClick={onSend}
          >
            Send
          </Button>
        </Space.Compact>
      </Card>
    </Skeleton>
  );
};

ChatBox.propTypes = {
  conversationId: PropTypes.string,
  refetchList: PropTypes.func,
};

ChatBox.defaultProps = {
  conversationId: null,
  refetchList: noop,
};

export default ChatBox;
