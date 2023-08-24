import { DownOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button, Col, Dropdown, Input, message, Row,
} from 'antd';
import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import logoutUserUtils from '../../Utils/AuthenticationUtils';
import { getCurrentUser } from '../../Utils/LocalStorageUtils';
import BecomeCreatorModal from '../BecomeCreatorModal/BecomeCreatorModal';

const NavigationBar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentUser = getCurrentUser();

  const isCreatorPage = location.pathname.includes('/creator');

  const [search, setSearch] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleSearch = () => {
    if (!search) {
      return;
    }

    navigate(`/search?search=${search}`);
  };

  const logoutUser = async () => {
    try {
      await logoutUserUtils();
      navigate('/');
      message.success('You are now logged out!');
    } catch (error) {
      message.error(error.data.message);
    }
  };

  const handleMenuClick = (event) => {
    const literal = {
      orders: () => navigate('/orders'),
      messages: () => navigate('/messages'),
      logout: logoutUser,
    };

    literal[event.key]();
  };

  const user = [
    {
      label: 'Orders',
      key: 'orders',
    },
    {
      label: 'Messages',
      key: 'messages',
    },
    {
      label: 'Logout',
      key: 'logout',
    },
  ];

  const creator = [
    {
      label: 'Logout',
      key: 'logout',
    },
  ];

  const items = isCreatorPage ? creator : user;

  const renderDashboardButton = () => {
    if (currentUser.isCreator) {
      return (
        <Link to="/creator/dashboard">
          <Button
            type="primary"
            style={{ marginRight: 10 }}
          >
            Creator Dashboard
          </Button>
        </Link>
      );
    }

    return (
      <Button
        type="primary"
        onClick={() => setIsModalVisible(true)}
        style={{ marginRight: 10 }}
      >
        Become A Creator
      </Button>
    );
  };

  return (
    <>
      <Row
        className="navigation-bar"
        align="middle"
      >
        <Col span={8}>
          <div
            className="logo"
            style={{
              float: 'left',
            }}
          >
            <Link
              className="link"
              to={!isCreatorPage ? '/' : '/creator/dashboard'}
            >
              <span
                className="text"
                style={{
                  fontSize: '16pt',
                  fontWeight: 'bold',
                  color: '#fff',
                }}
              >
                {!isCreatorPage ? 'Desaintara' : 'Desaintara Creator'}
              </span>
            </Link>
          </div>
        </Col>
        <Col span={8} className="search">
          {!isCreatorPage && (
            <Input.Search
              style={{ display: 'block' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onSearch={handleSearch}
            />
          )}
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
              {isCreatorPage ? (
                <Link to="/">
                  <Button
                    type="primary"
                    style={{ marginRight: 10 }}
                  >
                    Back to Home Page
                  </Button>
                </Link>
              ) : renderDashboardButton()}
              <Dropdown
                menu={{
                  items,
                  onClick: handleMenuClick,
                }}
                icon={<DownOutlined />}
              >
                <Link to={!isCreatorPage ? `/profile/${currentUser?._id}` : '?'}>
                  <Button
                    icon={<UserOutlined />}
                  >
                    {currentUser?.username}
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
      <BecomeCreatorModal
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
      />
    </>
  );
};

export default NavigationBar;
