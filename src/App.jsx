import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import './App.css';
import router from './Routes/Router';

const App = () => (
  // <AuthProvider>
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
  // </AuthProvider>
);

export default App;
