import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Layout } from 'antd';
import { Outlet, useLocation } from 'react-router-dom';
import BasicFooter from '../../Components/BasicFooter/BasicFooter';
import NavigationBar from '../../Components/NavigationBar/NavigationBar';

const {
  Footer,
  Header,
  Content,
} = Layout;

const queryClient = new QueryClient();

const BasicLayout = () => {
  const location = useLocation();

  const isCreatorPage = location.pathname.includes('/creator');

  return (
    <div>
      <QueryClientProvider client={queryClient}>
        <Layout>
          <Header
            style={{
              position: 'sticky',
              top: 0,
              zIndex: 1,
              width: '100%',
              backgroundColor: isCreatorPage ? '#291500' : '#001529',
            }}
          >
            <NavigationBar />
          </Header>
          <Content>
            <div
              style={{
                minHeight: 'calc(100vh - 64px - 69px)',
              }}
            >
              <Outlet />
            </div>
          </Content>
          <Footer>
            <BasicFooter />
          </Footer>
        </Layout>
      </QueryClientProvider>
    </div>
  );
};

export default BasicLayout;
