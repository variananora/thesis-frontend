import { Input, message, Modal } from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { createConversationService } from '../../Services/ConversationServices';

const MessageUserModal = ({
  receiver,
  isVisible,
  setIsVisible,
  isReceiverCreator,
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
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <Modal
      open={isVisible}
      title={isReceiverCreator ? 'Message Creator' : 'Message Buyer'}
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

MessageUserModal.propTypes = {
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  receiver: PropTypes.string,
  isReceiverCreator: PropTypes.bool,
};

MessageUserModal.defaultProps = {
  isVisible: false,
  setIsVisible: noop,
  receiver: '',
  isReceiverCreator: false,
};

export default MessageUserModal;
