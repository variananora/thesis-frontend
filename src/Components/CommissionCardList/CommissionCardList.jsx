import {
  DeleteOutlined, EditOutlined, StarOutlined, UserOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Avatar, Card, Col, Pagination, Row, Space, Spin, Tag,
} from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { COMMISSION_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';
import { base64ImageUrl } from '../../Utils/ImageUtils';

const { Meta } = Card;

const CommissionCardList = ({
  queryKey, params, usePagination, useConfig,
}) => {
  const defaultParams = {
    sorter: {},
    filters: {},
    searchKeyword: '',
    page: 1,
    pageSize: 6,
  };

  const [newParams, setNewParams] = useState({ ...defaultParams, ...params });

  const {
    isLoading, isFetching, data, refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => axiosHelper
      .get(COMMISSION_API, { params: newParams })
      .then((res) => res.data),
  });

  const onPageChange = async (page, pageSize) => {
    await setNewParams({ ...newParams, page, pageSize });
    await refetch();
  };

  return (
    <Spin spinning={isLoading || isFetching}>
      <Row>
        {data?.data && data.data.map((commission) => (
          <Col
            span={4}
            key={commission._id}
            style={{
              padding: '0.5rem',
            }}
          >
            <Link to={`/commission/${commission._id}`}>
              <Card
                hoverable
                cover={(
                  <img
                    alt={commission.name}
                    style={{
                      height: '40vh',
                      objectFit: 'cover',
                    }}
                    src={base64ImageUrl(
                      commission.cover.image.data,
                      commission.cover.image.mimetype,
                    )}
                  />
                )}
                actions={useConfig && [
                  <Link to={`/edit-commission/${commission._id}`}>
                    <EditOutlined key="edit" />
                  </Link>,
                  <Link to={`/delete-commission/${commission._id}`}>
                    <DeleteOutlined key="delete" />
                  </Link>,
                ]}
              >
                <Meta
                  title={commission.title}
                  description={(
                    <Tag color="green" icon="$">
                      {commission.price}
                    </Tag>
                  )}
                />
                <Space style={{ marginTop: '0.5rem' }}>
                  <span>
                    <StarOutlined />
                    {' '}
                    {!Number.isNaN(data.totalStars / data.starNumber)
                      ? Math.round(data.totalStars / data.starNumber)
                      : 0}
                  </span>
                  <span>
                    (
                    {data?.sales || 0}
                    {' '}
                    Sold)
                  </span>
                </Space>
                <br />
                {!useConfig && (
                  <Link to={`/profile/${commission.userId._id}`}>
                    <Space style={{ marginTop: '0.5rem' }}>
                      {commission.userId.image ? (
                        <Avatar
                          src={base64ImageUrl(
                            commission.userId.image.image.data,
                            commission.userId.image.image.mimetype,
                          )}
                        />
                      ) : (
                        <Avatar icon={<UserOutlined />} />
                      )}
                      {commission.userId.username}
                    </Space>
                  </Link>
                )}
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
      {usePagination && (
        <Pagination
          style={{
            marginTop: '1rem',
            textAlign: 'right',
          }}
          total={data?.totalData}
          current={newParams.page}
          pageSize={newParams.pageSize}
          onChange={onPageChange}
        />
      )}
    </Spin>
  );
};

CommissionCardList.propTypes = {
  queryKey: PropTypes.array.isRequired,
  params: PropTypes.object,
  usePagination: PropTypes.bool,
  useConfig: PropTypes.bool,
};

CommissionCardList.defaultProps = {
  params: {},
  usePagination: false,
  useConfig: false,
};

export default CommissionCardList;
