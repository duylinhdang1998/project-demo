import React from 'react';
import { IndexRouteProps, LayoutRouteProps, Navigate, PathRouteProps, Route, useLocation } from 'react-router-dom';

type PrivateRouteProps = PathRouteProps | LayoutRouteProps | IndexRouteProps;
export default function PrivateRoute({ ...rest }: PrivateRouteProps) {
  const token = '';
  const location = useLocation();
  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace={true} />;
  }
  return <Route {...rest} />;
}
