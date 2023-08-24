import { Tabs } from 'antd';
import CreatorCommission from '../../Components/CreatorCommission/CreatorCommission';
import CreatorOrders from '../../Components/CreatorOrders/CreatorOrders';
import CreatorProfile from '../../Components/CreatorProfile/CreatorProfile';
import CreatorTimeline from '../../Components/CreatorTimeline/CreatorTimeline';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';
import MessagesPage from '../Messages/MessagesPage';

const CreatorDashboardPage = () => {
  const currentUser = getCurrentUser();

  const tabItems = [
    {
      key: 'commission',
      label: 'Commission',
      children: <CreatorCommission userId={currentUser._id} />,
    },
    {
      key: 'orders',
      label: 'Orders',
      children: <CreatorOrders />,
    },
    {
      key: 'timeline',
      label: 'Timeline',
      children: <CreatorTimeline />,
    },
    {
      key: 'messages',
      label: 'Messages',
      children: <MessagesPage />,
    },
    {
      key: 'profile',
      label: 'Profile',
      children: <CreatorProfile userId={currentUser?._id} />,
    },
  ];

  return (
    <div
      className="dashboard-page"
      style={{
        marginTop: '0.5rem',
      }}
    >
      <Tabs
        defaultActiveKey="commission"
        type="card"
        size="large"
        items={tabItems}
      />
    </div>
  );
};

export default CreatorDashboardPage;
