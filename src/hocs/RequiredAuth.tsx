import { useAppSelector } from "hooks/useAppSelector";
import { FC, ReactElement, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { selectAuth } from "store/auth/selectors";

interface RequiredAuthProps {
  role?: string;
  children: ReactElement;
}

const RequiredAuth: FC<RequiredAuthProps> = ({ children, role }) => {
  const { token, userInfo } = useAppSelector(selectAuth);

  useEffect(() => {
    console.log({ userInfo, token });
  }, [userInfo, token]);

  if (!token || !userInfo?.role || (role && userInfo.role !== role)) {
    return <Navigate to="/login" replace={true} />;
  }
  return children;
};

export default RequiredAuth;
