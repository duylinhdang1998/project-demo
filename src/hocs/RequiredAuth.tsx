import useAuthStore from 'pages/LoginPage/store/auth';
import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';

export default function RequiredAuth({ children }) {
  const { token, userInfo } = useAuthStore();
  const location = useLocation();

  useEffect(() => {
    console.log({ userInfo, token });
  }, [userInfo, token]);

  if (!token || !userInfo?.role) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return children;
}
