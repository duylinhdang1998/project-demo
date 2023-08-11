import { Box } from '@mui/material';
import { useRequest } from 'ahooks';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { validateDomain } from 'services/System/validateDomain';

export const DomainValidatorLayout = () => {
  const { loading, data } = useRequest(validateDomain);

  const location = useLocation();

  if (loading) {
    return (
      <Box height="100vh">
        <LoadingScreen />
      </Box>
    );
  }

  if (!loading && !!data && location.pathname === '/domain-not-found') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};
