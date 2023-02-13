import { Divider, InputBase, InputLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import ListIcon from 'components/ListIcon/ListIcon';
import LayoutDetail from 'layout/LayoutDetail';

const useStyles = makeStyles(() => ({
  label: {
    fontSize: '14px !important',
    color: '#45485E',
    marginBottom: '4px',
  },
  inputSearch: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    padding: '12px 14px',
    height: '40px !important',
    fontSize: '14px !important',
  },
}));

export default function AddService() {
  const { t } = useTranslation(['serviceSetting', 'translation']);
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const handleCancel = () => setOpen(true);
  return (
    <LayoutDetail subTitle={t('service_settings')} title={t('translation:create_new', { type: t('translation:service') })}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
          <Typography color="#0c1132" fontWeight={700}>
            {t('translation:add_new', { type: t('translation:service') })}
          </Typography>
          <Divider sx={{ margin: '16px 0' }} />
          <Box>
            <InputLabel htmlFor="title" className={classes.label}>
              {t('service_title')}
            </InputLabel>
            <InputBase placeholder={t('service_title')} id="title" className={classes.inputSearch} fullWidth />
          </Box>
          <ListIcon />
          <Box display="flex" justifyContent="flex-end" marginTop="24px">
            <Button
              variant="outlined"
              sx={{
                margin: '0 8px',
                color: '#1AA6EE',
                width: 120,
              }}
              onClick={handleCancel}
            >
              {t('translation:cancel')}
            </Button>
            <Button
              sx={{
                margin: '0 8px',
                width: 120,
              }}
              variant="contained"
              backgroundButton="#1aa6ee"
            >
              {t('translation:save')}
            </Button>
          </Box>
        </Box>
      </Box>
      <DialogConfirm
        title={t('translation:cancel_type', { type: t('translation:service') })}
        subTitle={t('translation:leave_page')}
        cancelButtonText={t('translation:no')}
        okButtonText={t('translation:yes')}
        openDialog={open}
        onClose={handleClose}
      />
    </LayoutDetail>
  );
}
