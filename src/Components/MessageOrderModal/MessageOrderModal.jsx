import { Input, message, Modal } from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createConversationService } from '../../Services/ConversationServices';

const MessageOrderModal = ({
  receiver,
  isVisible,
  setIsVisible,
  onFinish,
  title,
}) => {
  const [messages, setMessages] = useState('');

  const onOk = async () => {
    if (!messages) {
      message.error('Message cannot be empty!');
      return;
    }

    try {
      const body = {
        receiver,
        message: messages,
      };
      await createConversationService(body);
      setIsVisible(false);
      message.success('Message sent successfully!');
      await onFinish();
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <Modal
      open={isVisible}
      title={title}
      onCancel={() => setIsVisible(false)}
      onOk={onOk}
    >
      <Input
        value={messages}
        onChange={(e) => setMessages(e.target.value)}
        placeholder="Type your message here..."
        onPressEnter={onOk}
      />
    </Modal>
  );
};

MessageOrderModal.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  receiver: PropTypes.string,
  onFinish: PropTypes.func,
  title: PropTypes.string,
};

MessageOrderModal.defaultProps = {
  isVisible: false,
  setIsVisible: noop,
  receiver: '',
  onFinish: noop,
  title: 'Send a message...',
};

export default MessageOrderModal;
