import React, { PropsWithChildren, useEffect } from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import Layout from 'src/pages/Layout';
import { getAuthInfo, isRefreshTokenExpired, isUserLoggedIn, refreshAccessToken } from 'src/util/auth';

const ProtectedRoute: React.FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const { accessTokenExpiry } = getAuthInfo();

  useEffect(() => {
    if (isUserLoggedIn() && isRefreshTokenExpired()){
      refreshAccessToken();
    }
  }, [location.pathname, accessTokenExpiry]);

  const pathname = `$${location.pathname}${location.search}`;

  if (!isUserLoggedIn() || isRefreshTokenExpired()) {
    return <Navigate to="/login" state={{ pathname }}/>;
  } else {
    return <Layout>{children || <Outlet />}</Layout>
    
  }
 
};

export default ProtectedRoute;
