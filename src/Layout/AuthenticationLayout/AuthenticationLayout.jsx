import { useOutlet } from 'react-router-dom';
import { AuthProvider } from '../../Provider/AuthenticationProvider/AuthenticationProvider';

const AuthenticationLayout = () => {
  const outlet = useOutlet();

  return (
    <AuthProvider>{outlet}</AuthProvider>
  );
};

export default AuthenticationLayout;
