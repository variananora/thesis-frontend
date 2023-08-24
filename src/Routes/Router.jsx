import { createBrowserRouter } from 'react-router-dom';
import CreatorCommission from '../Components/CreatorCommission/CreatorCommission';
import BasicLayout from '../Layouts/BasicLayout/BasicLayout';
import EmptyLayout from '../Layouts/EmptyLayout/EmptyLayout';
import CommissionCreationPage from '../Pages/CommissionCreation/CommissionCreationPage';
import CommissionDeletePage from '../Pages/CommissionDelete/CommissionDeletePage';
import CommissionEditPage from '../Pages/CommissionEdit/CommissionEditPage';
import CommissionViewPage from '../Pages/CommissionView/CommissionViewPage';
import CreatorDashboardPage from '../Pages/CreatorDashboardPage/CreatorDashboardPage';
import EditProfilePage from '../Pages/EditProfile/EditProfilePage';
import ErrorPage from '../Pages/Error/ErrorPage';
import HomePage from '../Pages/Home/HomePage';
import LoginPage from '../Pages/Login/LoginPage';
import MessagesPage from '../Pages/Messages/MessagesPage';
import OrdersPage from '../Pages/Orders/OrdersPage';
import RegisterPage from '../Pages/Register/RegisterPage';
import SearchPage from '../Pages/Search/SearchPage';
import ViewProfilePage from '../Pages/ViewProfile/ViewProfilePage';

const routes = [
  {
    path: '/',
    element: <BasicLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: 'search',
        element: <SearchPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'profile/:id',
        element: <ViewProfilePage />,
      },
      {
        path: 'commission/:id',
        element: <CommissionViewPage />,
      },
      {
        path: 'edit-profile',
        element: <EditProfilePage />,
      },
      {
        path: 'messages',
        element: <MessagesPage />,
      },
      {
        path: 'orders',
        element: <OrdersPage />,
      },
      {
        path: 'creator',
        element: <EmptyLayout />,
        children: [
          {
            path: 'dashboard',
            element: <CreatorDashboardPage />,
          },
          {
            path: 'commissions',
            element: <CreatorCommission />,
          },
          {
            path: 'create-commission',
            element: <CommissionCreationPage />,
          },
          {
            path: 'commission/:id',
            element: <CommissionViewPage isPreview />,
          },
          {
            path: 'edit-commission/:id',
            element: <CommissionEditPage />,
          },
          {
            path: 'delete-commission/:id',
            element: <CommissionDeletePage />,
          },
        ],
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
