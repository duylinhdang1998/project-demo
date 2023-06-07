import { Dialog, DialogActions, DialogContent, DialogTitle, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';

export interface DialogConfirmProps {
  openDialog: boolean;
  title?: string;
  subTitle?: string;
  cancelButtonText?: string;
  okButtonText?: string;
  onClose?: () => void;
  onOk?: () => void;
  loading?: boolean;
}

const useStyles = makeStyles((theme: Theme) => ({
  dialogContainer: {
    padding: '20px',
    borderRadius: '8px !important',
    maxWidth: '350px !important',
  },
  dialogTitle: {
    color: theme.palette.grey[100],
    textAlign: 'center',
    fontWeight: '700 !important',
    fontSize: '16px',
  },
  dialogContent: {
    padding: '24px 0',
    textAlign: 'center',
    fontSize: '14px !important',
  },
}));

function DialogConfirm({ openDialog, okButtonText, cancelButtonText, title, subTitle, onClose, onOk, loading }: DialogConfirmProps) {
  const classes = useStyles();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { t } = useTranslation('translation');

  useEffect(() => {
    setOpen(openDialog);
  }, [openDialog]);

  useEffect(() => {
    if (!open) {
      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleYes = () => {
    if (typeof onOk === 'function') {
      onOk?.();
    } else {
      navigate(-1);
      handleClose();
    }
  };

  return (
    <Dialog
      open={open}
      PaperProps={{
        className: classes.dialogContainer,
      }}
    >
      <DialogTitle className={classes.dialogTitle}>{title}</DialogTitle>
      <DialogContent className={classes.dialogContent}>{subTitle}</DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          sx={{
            marginRight: '4px',
            color: '#1AA6EE',
            flex: 1,
          }}
          onClick={handleClose}
        >
          {cancelButtonText ?? t('no')}
        </Button>
        <Button
          sx={{
            flex: 1,
          }}
          variant="contained"
          backgroundButton="#1aa6ee"
          onClick={handleYes}
          autoFocus
          loading={loading}
        >
          {okButtonText ?? t('yes')}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default memo(DialogConfirm);
