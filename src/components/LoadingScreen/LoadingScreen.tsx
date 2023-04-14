import { Stack } from '@mui/material';
import './loading.css';
export const LoadingScreen = () => {
  return (
    <Stack justifyContent="center" alignItems="center" paddingTop={8} height="100%">
      <div className="loader">
        <div className="inner one"></div>
        <div className="inner two"></div>
        <div className="inner three"></div>
      </div>
    </Stack>
  );
};
