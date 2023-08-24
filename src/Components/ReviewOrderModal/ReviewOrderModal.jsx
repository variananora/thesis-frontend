import {
  Input, message, Modal, Rate,
} from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { REVIEW_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';

const ReviewOrderModal = ({
  orderId,
  commissionId,
  isVisible,
  setIsVisible,
  refetch,
}) => {
  const [star, setStar] = useState(5);
  const [review, setReview] = useState('');

  const reviewOrder = async () => {
    if (!review) {
      message.error('Review cannot be empty!');
      return;
    }

    try {
      const body = {
        orderId,
        commissionId,
        star,
        review,
      };
      await axiosHelper.post(REVIEW_API, body);
      message.success('Review order successfully!');
      setIsVisible(false);
      refetch();
    } catch (error) {
      message.error(error?.data?.message);
    }
  };

  return (
    <Modal
      open={isVisible}
      title="Review Order"
      onCancel={() => setIsVisible(false)}
      onOk={reviewOrder}
      okText="Review"
    >
      <Rate
        value={star}
        onChange={(value) => setStar(value)}
        style={{
          marginBottom: '1rem',
        }}
      />
      <Input.TextArea
        value={review}
        onChange={(e) => setReview(e.target.value)}
        placeholder="Type your review here..."
      />
    </Modal>
  );
};

ReviewOrderModal.propTypes = {
  orderId: PropTypes.string,
  commissionId: PropTypes.string,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
  refetch: PropTypes.func,
};

ReviewOrderModal.defaultProps = {
  orderId: '',
  commissionId: '',
  isVisible: false,
  setIsVisible: noop,
  refetch: noop,
};

export default ReviewOrderModal;
