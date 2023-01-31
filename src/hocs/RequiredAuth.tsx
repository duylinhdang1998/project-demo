import { useAppSelector } from "hooks/useAppSelector";
import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { selectAuth } from "store/auth/selectors";

export default function RequiredAuth({ children }) {
  const { token, userInfo } = useAppSelector(selectAuth);

  useEffect(() => {
    console.log({ userInfo, token });
  }, [userInfo, token]);

  if (!token || !userInfo?.role) {
    return <Navigate to="/auth/login" replace={true} />;
  }
  return children;
}
