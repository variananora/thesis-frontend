import { Typography } from 'antd';
import CommissionCardList from '../../Components/CommissionCardList/CommissionCardList';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';

const MyCommissionViewPage = () => {
  const currentUser = getCurrentUser();

  return (
    <div>
      <Typography.Title level={4}>
        My Commissions
      </Typography.Title>
      <CommissionCardList
        queryKey={['commissions', currentUser._id]}
        params={{
          filters: { userId: currentUser._id },
          sorter: {
            name: 'createdAt',
            order: 'desc',
          },
        }}
        usePagination
        useConfig
      />
    </div>
  );
};
export default MyCommissionViewPage;
