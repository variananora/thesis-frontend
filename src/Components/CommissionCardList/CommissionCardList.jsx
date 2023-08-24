import { useQuery } from '@tanstack/react-query';
import {
  Col, Empty, Pagination, Row, Skeleton,
} from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { COMMISSION_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';
import CommissionCard from '../CommissionCard/CommissionCard';

const CommissionCardList = ({
  queryKey,
  params,
  usePagination,
  useConfig,
  useProfile,
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
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: [queryKey],
    queryFn: () => axiosHelper
      .get(COMMISSION_API, { params: newParams })
      .then((res) => res.data),
  });

  const onPageChange = async (page, pageSize) => {
    await setNewParams({
      ...newParams,
      page,
      pageSize,
    });
    await refetch();
  };

  return (
    <Skeleton loading={isLoading}>
      {!isEmpty(data?.data) ? (
        <>
          <Row>
            {data?.data && data.data.map((commission) => (
              <Col
                span={4}
                key={commission._id}
                style={{
                  padding: '0.5rem',
                }}
              >
                <CommissionCard
                  useProfile={useProfile}
                  useConfig={useConfig}
                  commission={commission}
                />
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
        </>
      ) : (
        <Empty />
      )}
    </Skeleton>
  );
};

CommissionCardList.propTypes = {
  queryKey: PropTypes.array.isRequired,
  params: PropTypes.object,
  usePagination: PropTypes.bool,
  useConfig: PropTypes.bool,
  useProfile: PropTypes.bool,
};

CommissionCardList.defaultProps = {
  params: {},
  usePagination: false,
  useConfig: false,
  useProfile: true,
};

export default CommissionCardList;
