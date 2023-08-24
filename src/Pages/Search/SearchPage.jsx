import { useQuery } from '@tanstack/react-query';
import {
  Col, Empty, Pagination, Row, Skeleton,
} from 'antd';
import { isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import CommissionCard from '../../Components/CommissionCard/CommissionCard';
import { COMMISSION_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const SearchPage = () => {
  const { search } = useLocation();

  const searchQuery = new URLSearchParams(search).get('search');

  const defaultParams = {
    sorter: {},
    filters: {},
    searchKeyword: searchQuery,
    page: 1,
    pageSize: 24,
  };

  const [params, setParams] = useState(defaultParams);

  const {
    isLoading,
    data,
    refetch,
  } = useQuery({
    queryKey: ['search'],
    queryFn: () => axiosHelper
      .get(COMMISSION_API, { params })
      .then((res) => res.data),
  });

  useEffect(() => {
    const updateAndRefetch = async () => {
      function sleep(ms) {
        // eslint-disable-next-line no-promise-executor-return
        return new Promise((resolve) => setTimeout(resolve, ms));
      }

      await setParams({
        ...params,
        searchKeyword: searchQuery,
      });
      await sleep(1000);
      await refetch();
    };
    updateAndRefetch();
  }, [searchQuery]);

  const onPageChange = async (page, pageSize) => {
    await setParams({
      ...params,
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
            {data?.data && data?.data?.map((commission) => (
              <Col
                span={4}
                key={commission._id}
                style={{
                  padding: '0.5rem',
                }}
              >
                <CommissionCard
                  useProfile
                  commission={commission}
                />
              </Col>
            ))}
          </Row>
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
        </>
      ) : (
        <Empty
          description="No commissions found"
        />
      )}
    </Skeleton>
  );
};

export default SearchPage;
