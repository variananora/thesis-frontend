import { Carousel, Typography } from 'antd';
import CommissionCardList from '../../Components/CommissionCardList/CommissionCardList';

const HomePage = () => {
  const contentStyle = {
    height: '160px',
    color: '#fff',
    lineHeight: '160px',
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

  return (
    <div>
      <Typography.Title level={3}>
        Home Page
      </Typography.Title>
      <Carousel
        autoplay
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
      </Carousel>
      <div>
        <Typography.Title level={3}>Newest Commissions</Typography.Title>
        <CommissionCardList
          queryKey={['newest-commissions']}
          params={params}
          usePagination={false}
        />
        {/* {data?.data && data.data.length < 6 && ( */}
        {/*   <Col span={(24 - (data.data.length * 4))}> */}
        {/*     <Link to="commission"> */}
        {/*       <Card hoverable> */}
        {/*         <Meta title="fuck" description="fuck" /> */}
        {/*       </Card> */}
        {/*     </Link> */}
        {/*   </Col> */}
        {/* )} */}
      </div>
    </div>
  );
};

export default HomePage;
