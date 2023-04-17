import { IconButton, Stack } from '@mui/material';
import { DialogMultiStopTripDetailProps } from './DialogMultiStopTripDetail';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import { DialogTitle } from 'components/DialogTitle/DialogTitle';

export const Title = ({ onClose, route }: DialogMultiStopTripDetailProps) => {
  const { t } = useTranslation(['routers']);

  return (
    <Stack direction="row" justifyContent="space-between" alignItems="center">
      <DialogTitle>
        {t('routers:routes')} #{route.routeCode}
      </DialogTitle>
      <IconButton onClick={onClose}>
        <ClearIcon />
      </IconButton>
    </Stack>
  );
};
