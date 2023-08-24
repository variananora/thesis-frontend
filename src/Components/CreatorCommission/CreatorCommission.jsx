import { PlusOutlined } from '@ant-design/icons';
import { Button, Space, Typography } from 'antd';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CommissionCardList from '../CommissionCardList/CommissionCardList';

const CreatorCommission = ({ userId }) => (
  <div>
    <Space
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        marginLeft: '0.5rem',
        marginRight: '0.5rem',
        marginBottom: '0.5rem',
      }}
    >
      <Typography.Title
        level={4}
        style={{
          margin: 0,
        }}
      >
        My Commissions
      </Typography.Title>
      <Link
        className="link"
        to="/creator/create-commission"
      >
        <Button
          icon={<PlusOutlined />}
          type="primary"
        >
          Commission
        </Button>
      </Link>
    </Space>
    <CommissionCardList
      queryKey={['commissions', userId]}
      params={{
        filters: { userId },
        sorter: {
          name: 'createdAt',
          order: 'desc',
        },
      }}
      usePagination
      useConfig
      useProfile={false}
    />
  </div>
);

CreatorCommission.propTypes = {
  userId: PropTypes.string,
};

CreatorCommission.defaultProps = {
  userId: '',
};

export default CreatorCommission;
