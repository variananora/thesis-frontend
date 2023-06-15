import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Col, Dropdown, Input, message, Row, Space,
} from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { USER_API } from '../../Constants/BackendApis';
import logoutUserUtils from '../../Utils/AuthenticationUtils';
import axiosHelper from '../../Utils/AxiosHelper';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';

const NavigationBar = () => {
  const navigate = useNavigate();
  const currentUser = getCurrentUser();

  const logoutUser = async () => {
    try {
      await logoutUserUtils();
      navigate('/');
      message.success('You are now logged out!');
    } catch (error) {
      message.error(error.data.message);
    }
  };

  const becomeSeller = async () => {
    try {
      await axiosHelper.post(`${USER_API}/become-seller`);
      message.success('You are now a seller! Please re-login to see changes.');
      await logoutUser();
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  const handleMenuClick = (event) => {
    const literal = {
      myCommissions: () => navigate('/my-commissions'),
      orders: () => navigate('/orders'),
      messages: () => navigate('/messages'),
      settings: () => navigate('/settings'),
      logout: logoutUser,
    };

    literal[event.key]();
  };

  const items = [
    currentUser?.isSeller && {
      label: 'My Commissions',
      key: 'myCommissions',
    },
    {
      label: 'Orders',
      key: 'orders',
    },
    {
      label: 'Messages',
      key: 'messages',
    },
    {
      label: 'Settings',
      key: 'settings',
    },
    {
      label: 'Logout',
      key: 'logout',
    },
  ];

  return (
    <Row
      className="navigation-bar"
      align="middle"
    >
      <Col span={8}>
        <div
          className="logo"
          style={{
            float: 'left',
            width: 120,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        >
          <Link className="link" to="/">
            <span className="text">Desaintara</span>
          </Link>
        </div>
      </Col>
      <Col span={8} className="search">
        <Input.Search style={{ display: 'block' }} />
      </Col>
      <Col
        span={8}
        className="links"
        style={{
          textAlign: 'right',
        }}
      >
        {currentUser ? (
          <>
            {currentUser?.isSeller ? (
              <Link
                className="link"
                to="/create-commission"
                style={{ marginRight: 10 }}
              >
                <Button type="primary">
                  Create Commission
                </Button>
              </Link>
            ) : (
              <Button
                type="primary"
                onClick={becomeSeller}
                style={{ marginRight: 10 }}
              >
                Become a Seller
              </Button>
            )}
            <Dropdown
              menu={{
                items,
                onClick: handleMenuClick,
              }}
              icon={<DownOutlined />}
            >
              <Link to={`/profile/${currentUser?._id}`}>
                <Button>
                  <Space>
                    <UserOutlined />
                    Profile
                  </Space>
                </Button>
              </Link>
            </Dropdown>
          </>
        ) : (
          <>
            <Link
              className="link"
              to="/register"
              style={{ marginRight: 10 }}
            >
              <Button type="primary">Register</Button>
            </Link>
            <Link className="link" to="/login">
              <Button type="primary">Login</Button>
            </Link>
          </>
        )}
      </Col>
    </Row>
  );
};

export default NavigationBar;
