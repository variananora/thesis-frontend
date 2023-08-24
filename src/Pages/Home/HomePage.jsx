import { Carousel, Typography } from 'antd';
import CommissionCardList from '../../Components/CommissionCardList/CommissionCardList';

const HomePage = () => {
  const contentStyle = {
    height: '300px',
    color: '#fff',
    lineHeight: '300px',
    textAlign: 'center',
    background: '#364d79',
  };

  const params = {
    sorter: {
      name: 'createdAt',
      order: 'desc',
    },
    page: 1,
    pageSize: 6,
  };

  const carouselImages = [
    '/carousel/image1.png',
    '/carousel/image2.png',
    '/carousel/image3.png',
  ];

  return (
    <div>
      <Carousel
        autoplay
        style={{
          margin: '1rem 0.5rem',
        }}
      >
        {carouselImages.map((img) => (
          <div key={img}>
            <div style={contentStyle}>
              <img
                alt=""
                src={img}
                style={{
                  objectFit: 'cover',
                  width: '100%',
                  height: '100%',
                }}
              />
            </div>
          </div>
        ))}
      </Carousel>
      <div>
        <Typography.Title
          level={4}
          style={{
            margin: '1rem 0.5rem',
          }}
        >
          Newest Commissions
        </Typography.Title>
        <CommissionCardList
          queryKey={['newest-commissions']}
          params={params}
          usePagination={false}
        />
      </div>
    </div>
  );
};

export default HomePage;
