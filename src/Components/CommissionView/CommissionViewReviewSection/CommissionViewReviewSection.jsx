import { useQuery } from '@tanstack/react-query';
import { Card, Typography } from 'antd';
import { isEmpty } from 'lodash';
import PropTypes from 'prop-types';
import { REVIEW_API } from '../../../Constants/BackendApis';
import axiosHelper from '../../../Utils/AxiosHelper';

const CommissionViewReviewSection = ({ listingId }) => {
  const { isLoading, data } = useQuery({
    queryKey: ['commission-review', listingId],
    queryFn: () => axiosHelper
      .get(`${REVIEW_API}/${listingId}`)
      .then((res) => res.data),
  });

  return (
    <Card loading={isLoading} style={{ marginTop: '1rem' }}>
      <Typography.Title level={5} style={{ marginTop: 0 }}>
        Reviews
      </Typography.Title>
      {!isEmpty(data) ? (
        'Reviews here'
      ) : (
        'No reviews yet'
      )}
    </Card>
  );
};

CommissionViewReviewSection.propTypes = {
  listingId: PropTypes.string,
};

CommissionViewReviewSection.defaultProps = {
  listingId: '',
};

export default CommissionViewReviewSection;
