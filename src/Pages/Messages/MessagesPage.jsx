import { useQuery } from '@tanstack/react-query';
import {
  Card, Col, Empty, Row, Spin, Typography,
} from 'antd';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import ChatBox from '../../Components/ChatBox/ChatBox';
import ConversationList from '../../Components/ConversationList/ConversationList';
import { CONVERSATION_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const MessagesPage = () => {
  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['conversations'],
    queryFn: () => axiosHelper
      .get(CONVERSATION_API)
      .then((res) => res.data),
  });

  const [selectedConversationId, setSelectedConversationId] = useState(null);

  const onClick = (conversation) => {
    setSelectedConversationId(conversation?._id);
  };

  return (
    <div className="messages">
      <Spin spinning={isLoading}>
        <div
          className="title"
          style={{
            marginLeft: '0.5rem',
            marginBottom: '0.5rem',
          }}
        >
          <Typography.Title
            level={4}
            style={{ margin: 0 }}
          >
            Messages
          </Typography.Title>
        </div>
        <div className="content">
          <Row>
            <Col span={6} />
            <Col span={6}>
              <Card
                style={{
                  height: '70vh',
                  overflowY: 'auto',
                }}
              >
                {!isEmpty(data) ? data?.map((conversation) => (
                  <ConversationList
                    key={conversation?._id}
                    conversation={conversation}
                    onClick={onClick}
                  />
                )) : (
                  <Empty />
                )}
              </Card>
            </Col>
            <Col span={6}>
              <ChatBox
                conversationId={selectedConversationId}
                refetchList={refetch}
              />
            </Col>
            <Col span={6} />
          </Row>
        </div>
      </Spin>
    </div>
  );
};

export default MessagesPage;
