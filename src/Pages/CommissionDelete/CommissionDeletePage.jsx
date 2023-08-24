import { useQuery } from '@tanstack/react-query';
import {
  Button, Card, message, Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import CommissionCard from '../../Components/CommissionCard/CommissionCard';
import { COMMISSION_API } from '../../Constants/BackendApis';
import { deleteCommissionService } from '../../Services/CommissionServices';
import axiosHelper from '../../Utils/AxiosHelper';

const CommissionDeletePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { data } = useQuery({
    queryKey: ['commission', id],
    queryFn: () => axiosHelper
      .get(`${COMMISSION_API}/${id}`)
      .then((res) => res.data),
  });

  const onCancel = () => {
    navigate('/creator/dashboard');
  };

  const onDelete = async () => {
    try {
      await deleteCommissionService(id);
      message.success('Commission deleted successfully!');
      navigate('/creator/dashboard');
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <div
      className="commission-delete"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <CommissionCard
        useProfile={false}
        commission={data}
        isDetail
      />
      <Card
        style={{
          marginTop: '1rem',
        }}
      >
        <Typography.Title
          level={5}
          style={{
            marginTop: 0,
            marginBottom: '1rem',
            textAlign: 'center',
          }}
        >
          Are you sure you want to delete this commission?
        </Typography.Title>
        <div
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
          }}
        >
          <Button
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            danger
            onClick={onDelete}
            style={{
              marginLeft: '1rem',
            }}
          >
            Delete
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default CommissionDeletePage;
