import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import logoTbus from 'assets/images/logo-tbus.png';
import Button from 'components/Button/Button';
import { DialogTitle } from 'components/DialogTitle/DialogTitle';
import { ReactNode, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import QRCode from 'react-qr-code';
import ReactToPrint from 'react-to-print';
import { PrintPDF } from './PrintPDF';
import { useStyles } from './styles';
import { useCurrency } from 'hooks/useCurrency';

interface ModalPrintTicketProps {
  open: boolean;
  title: ReactNode;
  totalPrice: number;
  qrCode: string;
  onClose: () => void;
  children: ReactNode;
}

export const ModalPrintTicket = ({ onClose, open, title, children, totalPrice, qrCode }: ModalPrintTicketProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();
  const { currencyFormat } = useCurrency();

  const printPDFRef = useRef<PrintPDF | null>(null);

  return (
    <Dialog open={open} fullWidth>
      <Stack padding="16px" direction="row" justifyContent="space-between" alignItems="center">
        <DialogTitle sx={{ padding: '0 !important' }}>{t('ticketSales:print_ticket')}</DialogTitle>
        <IconButton onClick={onClose}>
          <ClearIcon />
        </IconButton>
      </Stack>
      <Stack
        alignItems="center"
        paddingY="24px"
        sx={{ background: 'rgba(215, 218, 220, 1)', height: '376px', overflowX: 'hidden', overflowY: 'auto' }}
      >
        <PrintPDF ref={printPDFRef}>
          <Box className={classes.ticketContainer}>
            <Box className={classes.logo}>
              <img width={85} src={logoTbus} />
            </Box>
            <Box className={classes.ticketInfomation}>
              <Typography className={classes.ticketTitle}>{title}</Typography>
              {children}
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack py="12px" direction="row" justifyContent="space-between" alignItems="center">
                <Typography color={theme.palette.grey[300]} fontWeight="700">
                  {t('ticketSales:total')}
                </Typography>
                <Typography fontSize={24} color="#FF2727" fontWeight="700">
                  {currencyFormat(totalPrice)}
                </Typography>
              </Stack>
              <Divider sx={{ borderStyle: 'dashed', marginBottom: '16px' }} />
              <Box sx={{ maxWidth: 120, maxHeight: 120, marginLeft: 'auto', marginRight: 'auto', marginBottom: '12px' }}>
                <QRCode size={120} value={qrCode} />
              </Box>
            </Box>
          </Box>
        </PrintPDF>
      </Stack>
      <Stack direction="row" alignItems="center" justifyContent="flex-end" padding="16px">
        <Button
          sx={{
            color: 'rgba(26, 166, 238, 1)',
            backgroundColor: 'rgba(255, 255, 255, 1)',
            border: '1px solid rgba(26, 166, 238, 1)',
            padding: '10px 38px',
            marginRight: '16px',
          }}
          onClick={onClose}
        >
          {t('translation:cancel')}
        </Button>
        <ReactToPrint
          onAfterPrint={onClose}
          trigger={() => {
            return (
              <Button
                sx={{
                  backgroundColor: 'rgba(26, 166, 238, 1)',
                  color: 'rgba(255, 255, 255, 1)',
                  border: '1px solid rgba(26, 166, 238, 1)',
                  padding: '10px 38px',
                }}
                backgroundButton="rgba(26, 166, 238, 1)"
              >
                {t('ticketSales:print')}
              </Button>
            );
          }}
          content={() => printPDFRef.current}
        />
      </Stack>
    </Dialog>
  );
};
