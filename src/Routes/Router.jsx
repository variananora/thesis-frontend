import { createBrowserRouter } from 'react-router-dom';
import BasicLayout from '../Layouts/BasicLayout/BasicLayout';
import CommissionEditPage from '../Pages/CommissionEdit/CommissionEditPage';
import CommissionViewPage from '../Pages/CommissionView/CommissionViewPage';
import EditProfilePage from '../Pages/EditProfilePage/EditProfilePage';
import ErrorPage from '../Pages/Error/ErrorPage';
import HomePage from '../Pages/Home/HomePage';
import CommissionCreationPage from '../Pages/CommissionCreation/CommissionCreationPage';
import LoginPage from '../Pages/Login/LoginPage';
import MyCommissionViewPage from '../Pages/MyCommissionView/MyCommissionViewPage';
import ViewProfilePage from '../Pages/ViewProfile/ViewProfilePage';
import RegisterPage from '../Pages/Register/RegisterPage';

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
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/profile/:id',
        element: <ViewProfilePage />,
      },
      {
        path: '/create-commission',
        element: <CommissionCreationPage />,
      },
      {
        path: '/commission/:id',
        element: <CommissionViewPage />,
      },
      {
        path: '/edit-commission/:id',
        element: <CommissionEditPage />,
      },
      {
        path: 'my-commissions',
        element: <MyCommissionViewPage />,
      },
      {
        path: 'edit-profile',
        element: <EditProfilePage />,
      },
    ],
  },
];

const router = createBrowserRouter(routes);
export default router;
