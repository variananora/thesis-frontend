import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'antd';
import { Outlet } from 'react-router-dom';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';

const {
  Footer,
  Header,
  Content,
} = Layout;

const queryClient = new QueryClient();

const BasicLayout = () => (
  <div>
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Header style={{
          position: 'sticky',
          top: 0,
          zIndex: 1,
          width: '100%',
        }}
        >
          <NavigationBar />
        </Header>
        <Content>
          <div className="site-layout-content">
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          <h1>Footer</h1>
        </Footer>
      </Layout>
    </QueryClientProvider>
  </div>
);

export default BasicLayout;
