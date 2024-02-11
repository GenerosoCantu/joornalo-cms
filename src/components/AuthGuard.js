import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';

function AuthGuard({ children }) {
  const account = useSelector((state) => state.account);

  if (!account.user) {
    const tenant = localStorage.getItem("JoornaloTenant");
    const goto = tenant ? `/app/${tenant}/login` : '/home'
    return <Navigate to={goto} />;
  }

  return children;
}

AuthGuard.propTypes = {
  children: PropTypes.any
};

export default AuthGuard;
