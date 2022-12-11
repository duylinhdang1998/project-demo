import { Divider, InputBase, InputLabel, Stack, TextareaAutosize, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import BackButton from 'components/BackButton/BackButton';
import Button from 'components/Button/Button';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme: Theme) => ({
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
  inputArea: {
    border: '1px solid #f7f7f7',
    borderRadius: '4px !important',
    backgroundColor: '#fff',
    fontSize: '14px !important',
    width: '100%',
    padding: '12px 14px',
    '&:focus-visible': {
      outline: 'none !important',
    },
  },
}));

export default function AddPacakageSettings() {
  const { t } = useTranslation(['packageSettings', 'translation']);
  const classes = useStyles();

  const [open, setOpen] = React.useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  return (
    <Box>
      <HeaderLayout subTitleHeader={t('package_settings')} activeSideBarHeader={t('translation:create_new', { type: t('translation:pacakage') })} />
      <Box padding="24px">
        <Stack direction={{ mobile: 'column', laptop: 'row' }} spacing={{ xs: '30px', lg: '60px' }}>
          <BackButton />
          <Box width="100%" display="flex" justifyContent="center">
            <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
              <Typography color="#0c1132" fontWeight={700}>
                {t(`translation:add_new`, { type: t('translation:type') })}
              </Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <Box>
                <InputLabel htmlFor="title" className={classes.label}>
                  {t(`title`)}
                </InputLabel>
                <InputBase placeholder={t(`title`)} id="title" className={classes.inputSearch} fullWidth />
              </Box>
              <Box my="16px">
                <InputLabel htmlFor="description" className={classes.label}>
                  {t(`descriptions`)}
                </InputLabel>
                <TextareaAutosize minRows={10} maxRows={10} placeholder={t(`descriptions`)} id="description" className={classes.inputArea} />
              </Box>
              <Box display="flex" justifyContent="flex-end" marginTop="24px">
                <Button
                  variant="outlined"
                  sx={{
                    margin: '0 8px',
                    color: '#1AA6EE',
                    width: 120,
                  }}
                  onClick={handleCancel}>
                  {t('translation:cancel')}
                </Button>
                <Button
                  sx={{
                    margin: '0 8px',
                    width: 120,
                  }}
                  variant="contained"
                  backgroundButton="#1aa6ee">
                  {t('translation:save')}
                </Button>
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('translation:type') })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
}
