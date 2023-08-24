import { useQuery } from '@tanstack/react-query';
import {
  Card, List, Pagination, Rate, Space, Typography,
} from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { REVIEW_API } from '../../../Constants/BackendApis';
import axiosHelper from '../../../Utils/AxiosHelper';
import UserAvatar from '../../UserAvatar/UserAvatar';

const CommissionViewReviewSection = ({ commissionId }) => {
  const defaultParams = {
    sorter: {},
    filters: {},
    page: 1,
    pageSize: 6,
  };

  const [params, setParams] = useState(defaultParams);

  const {
    isLoading,
    data,
  } = useQuery({
    queryKey: ['commission-review', commissionId],
    queryFn: () => axiosHelper
      .get(`${REVIEW_API}/${commissionId}`, { params })
      .then((res) => res.data),
  });

  return (
    <Card loading={isLoading} style={{ marginTop: '1rem' }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Reviews
      </Typography.Title>
      {!isEmpty(data?.data) ? (
        <>
          <List>
            {data?.data.map((review) => (
              <Card
                bodyStyle={{
                  padding: '0.5rem',
                  margin: '0.5rem 0.5rem',
                }}
              >
                <Space>
                  <UserAvatar
                    image={review?.userId?.image}
                  />
                  <div>
                    <div>
                      <Typography.Text strong>{review?.userId?.username}</Typography.Text>
                      <Rate value={review?.star} disabled style={{ marginLeft: '1rem' }} />
                    </div>
                    {review?.review}
                  </div>
                </Space>
              </Card>
            ))}
          </List>
          <Pagination
            style={{
              marginTop: '1rem',
              textAlign: 'right',
            }}
            current={params.page}
            pageSize={params.pageSize}
            total={data.total}
            onChange={(page, pageSize) => setParams({
              ...params,
              page,
              pageSize,
            })}
          />
        </>
      ) : (
        'No reviews yet'
      )}
    </Card>
  );
};

CommissionViewReviewSection.propTypes = {
  commissionId: PropTypes.string,
};

CommissionViewReviewSection.defaultProps = {
  commissionId: '',
};

export default CommissionViewReviewSection;
