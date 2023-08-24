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
  Tooltip,
} from 'antd';
import { isEmpty } from 'lodash';
import { useState } from 'react';
import MessageOrderModal from '../../Components/MessageOrderModal/MessageOrderModal';
import MessageUserModal from '../../Components/MessageUserModal/MessageUserModal';
import OrderDetailModal from '../../Components/OrderDetailModal/OrderDetailModal';
import ReviewOrderModal from '../../Components/ReviewOrderModal/ReviewOrderModal';
import { ORDER_API } from '../../Constants/BackendApis';
import { updateOrderPaymentStatus } from '../../Services/OrderServices';
import axiosHelper from '../../Utils/AxiosHelper';
import { moneyFormatter } from '../../Utils/CommonUtils';
import { base64ImageUrl } from '../../Utils/ImageUtils';

const OrdersPage = () => {
  const defaultParams = {
    page: 1,
    pageSize: 10,
  };

  const [params, setParams] = useState(defaultParams);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['orders'],
    queryFn: () => axiosHelper
      .get(`${ORDER_API}/buyer`, { params })
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

  const updateOrderPayment = async (orderId) => {
    try {
      await updateOrderPaymentStatus(orderId);
      refetch();
    } catch (e) {
      message.error('Something went wrong!');
    }
  };

  const onClick = (order) => {
    window.snap.pay(order?.token, {
      onSuccess() {
        updateOrderPayment(order?._id)
          .then(() => {
            message.success('Payment success!');
          });
      },
      onPending() {
        updateOrderPayment(order?._id)
          .then(() => {
            message.success('Payment pending!');
          });
      },
      onError() {
        message.error('Payment failed!');
      },
      onClose() {
        message.error('Payment failed!');
      },
    });
  };

  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const [isMessageModalVisible, setIsMessageModalVisible] = useState(false);
  const [isRevisionModalVisible, setIsRevisionModalVisible] = useState(false);
  const [isReviewModalVisible, setIsReviewModalVisible] = useState(false);

  const openDetailModal = (order) => {
    setSelectedOrder(order);
    setIsDetailModalVisible(true);
  };

  const openRevisionModal = (order) => {
    setSelectedOrder(order);
    setIsRevisionModalVisible(true);
  };

  const openReviewModal = (order) => {
    setSelectedOrder(order);
    setIsReviewModalVisible(true);
  };

  const messageCreator = (order) => {
    setSelectedOrder(order);
    setIsMessageModalVisible(true);
  };

  const renderRevisionButton = (order) => {
    if (order?.status === 'FINISHED' && order?.revision < order?.maxRevision) {
      return (
        <Button
          type="primary"
          onClick={() => openRevisionModal(order)}
        >
          Revision
        </Button>
      );
    }
    return null;
  };

  const updateOrderStatusToRevision = async (order) => {
    try {
      const status = 'REVISION';

      await axiosHelper.put(`${ORDER_API}/revision/${order?._id}`, { status });
      setIsRevisionModalVisible(false);
      refetch();
      message.success('Revision asked!');
    } catch (e) {
      message.error('Something went wrong!');
    }
  };

  const completeOrder = async (order) => {
    try {
      const status = 'COMPLETED';

      await axiosHelper.put(`${ORDER_API}/complete/${order?._id}`, { status });
      refetch();
      message.success('Order completed!');
    } catch (e) {
      message.error('Something went wrong!');
    }
  };

  const renderReviewButton = (order) => {
    if (order?.status === 'COMPLETED' && !order?.reviewId) {
      return (
        <Button
          type="primary"
          onClick={() => openReviewModal(order)}
          style={{
            marginLeft: '0.5rem',
          }}
        >
          Review
        </Button>
      );
    }
    return null;
  };

  const renderCompleteButton = (order) => {
    if (order?.status === 'FINISHED') {
      return (
        <Button
          type="primary"
          onClick={() => completeOrder(order)}
          style={{
            marginLeft: '0.5rem',
          }}
        >
          Complete Order
        </Button>
      );
    }
    return null;
  };

  return (
    <div className="orders-page">
      <Skeleton loading={isLoading} active>
        <div
          style={{
            marginLeft: '1rem',
            marginRight: '1rem',
          }}
        >
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
                    {renderRevisionButton(order)}
                    {renderReviewButton(order)}
                    {renderCompleteButton(order)}
                    <Button
                      type="primary"
                      onClick={() => messageCreator(order)}
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
                    {order?.paymentStatus === 'UNPAID' && (
                      <Button
                        type="primary"
                        onClick={() => onClick(order)}
                        style={{
                          marginLeft: '0.5rem',
                        }}
                      >
                        Pay
                      </Button>
                    )}
                    {(order?.paymentStatus === 'UNPAID' || order?.paymentStatus === 'PENDING') && (
                      <Tooltip title="Update payment status">
                        <Button
                          onClick={() => updateOrderPayment(order?._id)}
                          style={{
                            marginLeft: '0.5rem',
                          }}
                        >
                          Update
                        </Button>
                      </Tooltip>
                    )}
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
        isReceiverCreator
      />
      <MessageOrderModal
        title="Ask for revision"
        receiver={selectedOrder?.creatorId?._id}
        isVisible={isRevisionModalVisible}
        setIsVisible={setIsRevisionModalVisible}
        onFinish={() => updateOrderStatusToRevision(selectedOrder)}
      />
      <ReviewOrderModal
        orderId={selectedOrder?._id}
        commissionId={selectedOrder?.commissionId}
        isVisible={isReviewModalVisible}
        setIsVisible={setIsReviewModalVisible}
        refetch={refetch}
      />
    </div>
  );
};

export default OrdersPage;
