import { createBrowserRouter } from 'react-router-dom';
import ErrorPage from '../Pages/Error/ErrorPage';
import HomePage from '../Pages/Home/HomePage';
import LoginPage from '../Pages/Login/LoginPage';
import RegisterPage from '../Pages/Register/RegisterPage';

const routes = [
  { path: '/', element: <HomePage />, errorElement: <ErrorPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/register', element: <RegisterPage /> },
];

const router = createBrowserRouter(routes);
export default router;
