import { useQuery } from '@tanstack/react-query';
import { Spin, Tabs, Typography } from 'antd';
import { useParams } from 'react-router-dom';
import CommissionCardList from '../../Components/CommissionCardList/CommissionCardList';
import ViewProfile from '../../Components/ViewProfile/ViewProfile';
import { USER_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const ViewProfilePage = () => {
  const { id } = useParams();

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ['view-profile', id],
    queryFn: () => axiosHelper
      .get(`${USER_API}/${id}`)
      .then((res) => res.data),
  });

  const tabItems = [
    {
      key: 'profile',
      label: 'Profile',
      children: <ViewProfile data={data} />,
    },
    {
      key: 'commissions',
      label: 'Commissions',
      children: (
        <>
          <Typography.Title level={4}>
            {data?.username}
            {' '}
            Commissions
          </Typography.Title>
          <CommissionCardList
            queryKey={['commissions', id]}
            params={{
              filters: { userId: id },
              sorter: {
                name: 'createdAt',
                order: 'desc',
              },
            }}
            usePagination
            useProfile={false}
          />
        </>
      ),
      disabled: !data?.isCreator,
    },
  ];

  return (
    <div className="view-profile-page">
      <Spin spinning={isLoading}>
        {error ? (
          'Something went wrong!'
        ) : (
          <Tabs
            defaultActiveKey="profile"
            type="card"
            size="large"
            items={tabItems}
          />
        )}
      </Spin>
    </div>
  );
};
export default ViewProfilePage;
