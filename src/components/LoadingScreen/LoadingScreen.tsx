import { Stack } from '@mui/material';
import Lottie from 'react-lottie';
import animationData from './lottie-loading.json';

export const LoadingScreen = () => {
  return (
    <Stack justifyContent="center" alignItems="center" paddingTop={8}>
      <Lottie options={{ loop: true, autoplay: true, animationData }} height={200} width={200} />
    </Stack>
  );
};
