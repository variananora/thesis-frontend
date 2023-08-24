import { useQuery } from '@tanstack/react-query';
import {
  Card, Col, Empty, Row, Skeleton, Typography,
} from 'antd';
import { isEmpty } from 'lodash';
import moment from 'moment';
import { ORDER_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const CreatorTimeline = () => {
  const {
    isLoading,
    data,
  } = useQuery({
    queryKey: ['timeline'],
    queryFn: () => axiosHelper
      .get(`${ORDER_API}/timeline`)
      .then((res) => res.data),
  });

  const renderCol = (title, orders) => (
    <Col
      span={8}
      style={{
        padding: '0 0.5rem',
      }}
    >
      <Typography.Title
        level={5}
        style={{
          margin: 0,
          marginBottom: '0.5rem',
        }}
      >
        {title}
      </Typography.Title>
      <Card
        style={{
          backgroundColor: '#f0f2f5',
        }}
      >
        {!isEmpty(orders) ? orders?.map((order) => (
          <Card
            hoverable
            key={order?._id}
            style={{
              marginBottom: '0.5rem',
            }}
          >
            Buyer:
            {' '}
            {order?.buyerId?.username}
            <br />
            Status:
            {' '}
            {order?.status}
            <br />
            Payment Status:
            {' '}
            {order?.paymentStatus}
            <br />
            Last updated:
            {' '}
            {moment(order?.updatedAt)
              .format('DD/MM/YYYY HH:mm')}
          </Card>
        )) : (
          <Empty />
        )}
      </Card>
    </Col>
  );

  return (
    <div className="creator-orders-page">
      <Typography.Title
        level={4}
        style={{
          margin: 0,
          marginLeft: '0.5rem',
          marginRight: '0.5rem',
          marginBottom: '0.5rem',
        }}
      >
        Order Timeline
      </Typography.Title>
      <Skeleton loading={isLoading} active>
        <Card
          style={{
            marginLeft: '1rem',
            marginRight: '1rem',
            backgroundColor: '#c0c2c5',
          }}
        >
          <Row>
            {renderCol('Pending/Incoming', data?.pending)}
            {renderCol('Ongoing', data?.ongoing)}
            {renderCol('Completed', data?.completed)}
          </Row>
        </Card>
      </Skeleton>
    </div>
  );
};

export default CreatorTimeline;
