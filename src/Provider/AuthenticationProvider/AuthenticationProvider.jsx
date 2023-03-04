import { elementType } from 'prop-types';
import { createContext, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import useLocalStorage from '../../Utils/LocalStorageUtils';

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useLocalStorage('token', null);
  const [user, setUser] = useLocalStorage('user', null);
  const navigate = useNavigate();

  const login = async (userToken, userDetails) => {
    setToken(userToken);
    setUser(userDetails);
    navigate('/');
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    navigate('/', { replace: true });
  };

  const value = useMemo(
    () => ({
      user,
      token,
      login,
      logout,
    }),
    [user],
  );
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: elementType.isRequired,
};
export const useAuth = () => useContext(AuthContext);
