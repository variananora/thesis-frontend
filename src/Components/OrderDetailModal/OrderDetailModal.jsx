import { Modal } from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';
import { moneyFormatter } from '../../Utils/CommonUtils';

const OrderDetailModal = ({
  data,
  isVisible,
  setIsVisible,
}) => (
  <Modal
    open={isVisible}
    title="Order Detail"
    onCancel={() => setIsVisible(false)}
    footer={null}
  >
    Order ID:
    {' '}
    {`order-${data?._id}`}
    <br />
    Title:
    {' '}
    {data?.title}
    <br />
    Price:
    {' '}
    {moneyFormatter(data?.price)}
    <br />
    Order Status:
    {' '}
    {data?.status}
    <br />
    Payment Status:
    {' '}
    {data?.paymentStatus}
    <br />
    Creator:
    {' '}
    {data?.creatorId?.username}
    <br />
    Buyer:
    {' '}
    {data?.buyerId?.username}
  </Modal>
);

OrderDetailModal.propTypes = {
  data: PropTypes.object,
  isVisible: PropTypes.bool,
  setIsVisible: PropTypes.func,
};

OrderDetailModal.defaultProps = {
  data: {},
  isVisible: false,
  setIsVisible: noop,
};

export default OrderDetailModal;
