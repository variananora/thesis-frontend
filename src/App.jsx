import { ConfigProvider } from 'antd';
import { RouterProvider } from 'react-router-dom';
import './App.scss';
import router from './Routes/Router';

const App = () => (
  <ConfigProvider>
    <RouterProvider router={router} />
  </ConfigProvider>
);

export default App;
