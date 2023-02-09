import { Box, Divider, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import LayoutDetail from 'layout/LayoutDetail';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import FormAddEvent from './components/FormAddEvent';

export default function AddNewEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);
  const [open, setOpen] = useState(false);
  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <LayoutDetail title={t('translation:add_new', { type: t('translation:event').toLowerCase() })} subTitle={t('vehicles')}>
      <Box display="flex" justifyContent="center" width="100%">
        <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
          <Typography fontSize={16} fontWeight="700">
            Add event for vehicle DX727AM
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <FormAddEvent />
          <ComboButton textOk={t('translation:save')} onCancel={handleCancel} />
        </Box>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('translation:event').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
