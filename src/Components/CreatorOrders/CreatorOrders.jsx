import { useQuery } from '@tanstack/react-query';
import {
  Avatar,
  Button,
  Card,
  Col,
  Divider,
  Empty,
  message,
  Pagination,
  Row,
  Skeleton,
  Space,
  Tag,
  Typography,
} from 'antd';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import { ORDER_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';
import { moneyFormatter } from '../../Utils/CommonUtils';
import { base64ImageUrl } from '../../Utils/ImageUtils';
import MessageOrderModal from '../MessageOrderModal/MessageOrderModal';
import MessageUserModal from '../MessageUserModal/MessageUserModal';
import OrderDetailModal from '../OrderDetailModal/OrderDetailModal';

const CreatorOrders = () => {
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };

  const [params, setParams] = useState(defaultParams);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isFinishModalVisible, setIsFinishModalVisible] = useState(false);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['creator-orders'],
    queryFn: () => axiosHelper
      .get(`${ORDER_API}/creator`, { params })
      .then((res) => res.data),
  });

  const onPageChange = async (page, pageSize) => {
    await setParams({
      ...params,
      page,
      pageSize,
    });
    await refetch();
  };

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalVisible(true);
  };

  const messageBuyer = (order) => {
    setSelectedOrder(order);
    setIsFinishModalVisible(true);
  };

  const updateStatus = async (order) => {
    const statusUpdate = (status) => {
      if (status === 'PENDING') {
        return 'IN_PROGRESS';
      }
      if (status === 'IN_PROGRESS' || status === 'REVISION') {
        return 'FINISHED';
      }
      return 'Error';
    };

    try {
      const status = statusUpdate(order?.status);

      await axiosHelper.put(`${ORDER_API}/status/${order?._id}`, { status });
      setIsDetailModalVisible(false);
      refetch();
      message.success('Status updated!');
    } catch (e) {
      message.error('Something went wrong!');
    }
  };

  const renderUpdateStatusButton = (order) => {
    const { status } = order;
    if (status === 'FINISHED' || status === 'COMPLETED') {
      return null;
    }

    if (status === 'IN_PROGRESS' || status === 'REVISION') {
      return (
        <Button
          onClick={() => messageBuyer(order)}
        >
          Update to Finished
        </Button>
      );
    }

    const text = () => {
      if (status === 'PENDING') {
        return 'Update to In Progress';
      }
      return 'Error';
    };

    return (
      <Button
        onClick={() => updateStatus(order)}
      >
        {text()}
      </Button>
    );
  };

  return (
    <div
      className="creator-orders-page"
      style={{
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        Incoming Orders
      </Typography.Title>
      <Skeleton loading={isLoading} active>
        <div>
          {!isEmpty(data?.data)
            ? data?.data?.map((order) => (
              <Card
                key={order?._id}
                style={{
                  marginTop: '0.5rem',
                  display: 'block',
                }}
              >
                <Row>
                  <Col span={8}>
                    <Space>
                      <Avatar
                        size="large"
                        shape="square"
                        src={base64ImageUrl(
                          order?.image?.image?.data,
                          order?.image?.image?.mimetype,
                        )}
                      />
                      <div>
                        {order?.title}
                        <br />
                        <Tag color="green">
                          {moneyFormatter(order?.price)}
                        </Tag>
                      </div>
                    </Space>
                  </Col>
                  <Col span={8}>
                    <Space>
                      <Divider type="vertical" />
                      <div>
                        Order Status:
                        {' '}
                        {order?.status}
                        <br />
                        Payment Status:
                        {' '}
                        {order?.paymentStatus}
                      </div>
                    </Space>
                  </Col>
                  <Col
                    span={8}
                    style={{
                      textAlign: 'right',
                    }}
                  >
                    {renderUpdateStatusButton(order)}
                    <Button
                      type="primary"
                      onClick={() => messageBuyer(order)}
                      style={{
                        marginLeft: '0.5rem',
                      }}
                    >
                      Message
                    </Button>
                    <Button
                      onClick={() => openDetailModal(order)}
                      style={{
                        marginLeft: '0.5rem',
                      }}
                    >
                      Details
                    </Button>
                  </Col>
                </Row>
              </Card>
            )) : (
              <Empty />
            )}
          <Pagination
            style={{
              marginTop: '1rem',
              textAlign: 'right',
            }}
            total={data?.totalData}
            current={params.page}
            pageSize={params.pageSize}
            onChange={onPageChange}
          />
        </div>
      </Skeleton>
      <OrderDetailModal
        data={selectedOrder}
        isVisible={isDetailModalVisible}
        setIsVisible={setIsDetailModalVisible}
      />
      <MessageUserModal
        receiver={selectedOrder?.creatorId?._id}
        isVisible={isMessageModalVisible}
        setIsVisible={setIsMessageModalVisible}
      />
      <MessageOrderModal
        title="Send your work"
        receiver={selectedOrder?.buyerId?._id}
        isVisible={isFinishModalVisible}
        setIsVisible={setIsFinishModalVisible}
        onFinish={() => updateStatus(selectedOrder)}
      />
    </div>
  );
};

export default CreatorOrders;
