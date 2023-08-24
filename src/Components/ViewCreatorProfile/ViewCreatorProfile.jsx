import { Button, Descriptions } from 'antd';
import { noop } from 'lodash';
import PropTypes from 'prop-types';

const ViewCreatorProfile = ({
  data,
  setIsEdit,
}) => {
  const bankTranslation = {
    bca: 'BCA',
    bni: 'BNI',
    bri: 'BRI',
    mandiri: 'Mandiri',
    cimb: 'CIMB',
    danamon: 'Danamon',
    permata: 'Permata',
  };

  return (
    <div>
      <Descriptions>
        <Descriptions.Item label="Bio" span={3}>
          {data?.description || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Bank Name" span={3}>
          {bankTranslation[data?.bankDetails?.bankCode] || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Account Number" span={3}>
          {data?.bankDetails?.accountNumber || '-'}
        </Descriptions.Item>
        <Descriptions.Item label="Account Holder Name" span={3}>
          {data?.bankDetails?.accountHolderName || '-'}
        </Descriptions.Item>
      </Descriptions>
      <Button type="primary" onClick={() => setIsEdit(true)}>
        Edit Profile
      </Button>
    </div>
  );
};

ViewCreatorProfile.propTypes = {
  data: PropTypes.object,
  setIsEdit: PropTypes.func,
};

ViewCreatorProfile.defaultProps = {
  data: {},
  setIsEdit: noop,
};

export default ViewCreatorProfile;
