import { DialogTitle, IconButton, Stack } from '@mui/material';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';
import ClearIcon from '@mui/icons-material/Clear';

export const Title = ({ onClose, route }: DialogMultiStopTripDetailProps) => {
  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <DialogTitle sx={{ padding: '0 !important' }}># {route.routeCode}</DialogTitle>
      <IconButton onClick={onClose}>
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};
