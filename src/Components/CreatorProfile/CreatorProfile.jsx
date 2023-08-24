import { useQuery } from '@tanstack/react-query';
import { Spin } from 'antd';
import PropTypes from 'prop-types';
import { useState } from 'react';
import { USER_API } from '../../Constants/BackendApis';
import axiosHelper from '../../Utils/AxiosHelper';
import EditCreatorProfile from '../EditCreatorProfile/EditCreatorProfile';
import ViewCreatorProfile from '../ViewCreatorProfile/ViewCreatorProfile';

const CreatorProfile = ({ userId }) => {
  const [isEdit, setIsEdit] = useState(false);

  const {
    isLoading,
    refetch,
    data,
  } = useQuery({
    queryKey: ['view-profile', userId],
    queryFn: () => axiosHelper
      .get(`${USER_API}/${userId}`)
      .then((res) => res.data),
  });

  return (
    <Spin spinning={isLoading}>
      {isEdit ? (
        <EditCreatorProfile
          data={data}
          setIsEdit={setIsEdit}
          refetch={refetch}
        />
      ) : (
        <ViewCreatorProfile
          data={data}
          setIsEdit={setIsEdit}
        />
      )}

    </Spin>
  );
};

CreatorProfile.propTypes = {
  userId: PropTypes.string,
};

CreatorProfile.defaultProps = {
  userId: '',
};

export default CreatorProfile;
