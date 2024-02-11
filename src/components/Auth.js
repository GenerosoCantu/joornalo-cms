import React, {
  useEffect,
  useState
} from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import SplashScreen from 'src/components/SplashScreen';
import { setUserData, logout } from 'src/store/actions/accountActions';
import authService from 'src/services/authService';
import { getTenant } from 'src/store/actions/tenantActions';
import { useLocation } from 'react-router-dom';
function Auth({ children }) {
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);

  // let tenant = 'joornalo';
  let tenant = null;
  const { pathname } = useLocation();
  const params = pathname.split('/');

  if (params[1] === 'app' && params[2]) {
    tenant = params[2]
  }

  useEffect(() => {
    const initAuth = async () => {
      authService.setAxiosInterceptors({
        onLogout: () => dispatch(logout())
      });

      authService.handleAuthentication();

      if (authService.isAuthenticated()) {
        dispatch(getTenant(tenant));
        const user = await authService.loginInWithToken(tenant);

        await dispatch(setUserData(user));
      }

      setLoading(false);
    };

    initAuth();
  }, [dispatch]);

  if (isLoading) {
    return <SplashScreen />;
  }

  return children;
}

Auth.propTypes = {
  children: PropTypes.any
};

export default Auth;
