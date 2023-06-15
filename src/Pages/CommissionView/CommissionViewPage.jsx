import { useQuery } from '@tanstack/react-query';
import {
  Carousel, Col, Row, Spin, Typography,
} from 'antd';
import { useParams } from 'react-router-dom';
import CommissionViewDescriptionSection
  from '../../Components/CommissionView/CommissionViewDescriptionSection/CommissionViewDescriptionSection';
import CommissionViewOrderSection
  from '../../Components/CommissionView/CommissionViewOrderSection/CommissionViewOrderSection';
import CommissionViewReviewSection
  from '../../Components/CommissionView/CommissionViewReviewSection/CommissionViewReviewSection';
import { COMMISSION_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const CommissionViewPage = () => {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['commission', id],
    queryFn: () => axiosHelper
      .get(`${COMMISSION_API}/${id}`)
      .then((res) => res.data),
  });

  const contentStyle = {
    margin: 0,
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
    textAlign: 'center',
    background: '#364d79',
  };

  return (
    <div className="commission-view">
      <Spin spinning={isLoading}>
        {error ? (
          'Something went wrong!'
        ) : (
          <>
            <Typography.Title level={4}>{data?.title}</Typography.Title>
            <Row>
              <Col
                span={16}
                style={{ padding: '0.5rem' }}
              >
                {/* <Carousel */}
                {/*   autoplay */}
                {/* > */}
                {/*   {data?.images.map((image) => ( */}
                {/*     <div key={image?._id}> */}
                {/*       <Image */}
                {/*         alt={image?.name} */}
                {/*         style={{ objectFit: 'cover' }} */}
                {/*         height={400} */}
                {/*     src={bufferToBase64ImageUrl(image?.image?.data, image?.image?.mimetype)} */}
                {/*       /> */}
                {/*     </div> */}
                {/*   ))} */}
                {/* </Carousel> */}
                <Carousel
                  arrows
                >
                  <div>
                    <h3 style={contentStyle}>1</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>2</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>3</h3>
                  </div>
                  <div>
                    <h3 style={contentStyle}>4</h3>
                  </div>
                </Carousel>
                <CommissionViewDescriptionSection data={data} isLoading={isLoading} />
                <CommissionViewReviewSection listingId={id} />
              </Col>
              <Col span={8}>
                <CommissionViewOrderSection data={data} isLoading={isLoading} />
              </Col>
            </Row>
          </>
        )}
      </Spin>
    </div>
  );
};

export default CommissionViewPage;
