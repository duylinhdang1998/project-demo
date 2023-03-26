import { Stack } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from './lottie-loading.json';

export const LoadingScreen = () => {
  return (
    <Stack justifyContent="center" alignItems="center" paddingTop={8} height="100%">
      <Lottie
        options={{
          rendererSettings: { progressiveLoad: true },
          loop: true,
          autoplay: true,
          animationData,
        }}
        height={120}
        width={120}
      />
    </Stack>
  );
};
