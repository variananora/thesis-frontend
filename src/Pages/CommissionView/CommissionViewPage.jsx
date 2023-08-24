import { useQuery } from '@tanstack/react-query';
import {
  Button, Carousel, Col, Image, message, Row, Space, Spin, Typography,
} from 'antd';
import PropTypes from 'prop-types';
import { useNavigate, useParams } from 'react-router-dom';
import CommissionViewDescriptionSection
  from '../../Components/CommissionView/CommissionViewDescriptionSection/CommissionViewDescriptionSection';
import CommissionViewOrderSection
  from '../../Components/CommissionView/CommissionViewOrderSection/CommissionViewOrderSection';
import CommissionViewReviewSection
  from '../../Components/CommissionView/CommissionViewReviewSection/CommissionViewReviewSection';
import { COMMISSION_API } from '../../Constants/BackendApis';
import { createOrder } from '../../Services/OrderServices';
import axiosHelper from '../../Utils/AxiosHelper';
import { bufferToBase64ImageUrl } from '../../Utils/ImageUtils';

const CommissionViewPage = ({ isPreview }) => {
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    isLoading,
    error,
    data,
  } = useQuery({
    queryKey: ['commission', id],
    queryFn: () => axiosHelper
      .get(`${COMMISSION_API}/${id}`)
      .then((res) => res.data),
  });

  const contentStyle = {
    margin: 0,
    height: '400px',
    color: '#fff',
    lineHeight: '400px',
    textAlign: 'center',
    justifyContent: 'center',
    display: 'flex',
    alignContent: 'center',
    alignSelf: 'center',
    background: '#828282',
  };

  const doOrder = async () => {
    try {
      await createOrder(id);
      navigate('/orders');
      message.success('Order created!');
    } catch (e) {
      message.error('Something went wrong!');
    }
  };

  return (
    <div className="commission-view">
      {isPreview && (
        <div
          className="commission-view-preview"
          style={{
            marginLeft: '0.5rem',
            marginTop: '0.5rem',
            marginBottom: '1rem',
          }}
        >
          <Space>
            <Button
              onClick={() => navigate('/creator/dashboard')}
            >
              Back
            </Button>
            <Typography.Title
              level={4}
              style={{
                margin: 0,
              }}
            >
              Preview Mode
            </Typography.Title>
          </Space>
        </div>
      )}
      <Spin spinning={isLoading}>
        {error ? (
          'Something went wrong!'
        ) : (
          <div
            style={{
              marginLeft: '0.5rem',
              marginRight: '0.5rem',
            }}
          >
            <Typography.Title level={4}>
              {data?.title}
            </Typography.Title>
            <Row>
              <Col
                span={16}
                style={{ paddingRight: '0.5rem' }}
              >
                <Carousel autoplay>
                  {data?.images.map((image) => (
                    <div key={image?._id}>
                      <div style={contentStyle}>
                        <Image
                          alt={image?.name}
                          style={{ objectFit: 'cover' }}
                          height={400}
                          src={bufferToBase64ImageUrl(image?.image?.data, image?.image?.mimetype)}
                        />
                      </div>
                    </div>
                  ))}
                </Carousel>
                <CommissionViewDescriptionSection data={data} isLoading={isLoading} />
                <CommissionViewReviewSection commissionId={id} />
              </Col>
              <Col
                span={8}
                style={{ paddingLeft: '0.5rem' }}
              >
                <CommissionViewOrderSection
                  data={data}
                  isLoading={isLoading}
                  doOrder={doOrder}
                />
              </Col>
            </Row>
          </div>
        )}
      </Spin>
    </div>
  );
};

CommissionViewPage.propTypes = {
  isPreview: PropTypes.bool,
};

CommissionViewPage.defaultProps = {
  isPreview: false,
};

export default CommissionViewPage;
