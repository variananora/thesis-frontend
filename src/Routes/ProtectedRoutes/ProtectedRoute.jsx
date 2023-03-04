import { elementType } from 'prop-types';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../Provider/AuthenticationProvider/AuthenticationProvider';

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
};

ProtectedRoute.propTypes = {
  children: elementType.isRequired,
};

export default ProtectedRoute;
