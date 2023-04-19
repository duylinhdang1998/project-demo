import { Box, Dialog, Divider, IconButton, Stack, Typography, useTheme } from '@mui/material';
import { DialogTitle } from 'components/DialogTitle/DialogTitle';
import ClearIcon from '@mui/icons-material/Clear';
import { useTranslation } from 'react-i18next';
import logoTbus from 'assets/images/logo-tbus.png';
import { useStyles } from './styles';
import { Infomation } from '../OrderDetail/Infomation';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { MapPinIcon } from 'assets';
import dayjs from 'dayjs';
import Tag from 'components/Tag/Tag';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import QRCode from 'react-qr-code';
import Button from 'components/Button/Button';
import { PrintPDF } from './PrintPDF';
import { useRef } from 'react';
import ReactToPrint from 'react-to-print';

interface ModalPrintTicketProps {
  open: boolean;
  onClose: () => void;
  record: ColumnTicket;
}

export const ModalPrintTicket = ({ onClose, open, record }: ModalPrintTicketProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

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
              <Typography className={classes.ticketTitle}>{t('ticketSales:ticket_order').toUpperCase()}</Typography>
              <Infomation
                left={t('ticketSales:order_id')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {record.rawData.orderCode}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:lastName')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {record.lastName}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:firstName')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {record.firstName}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:trip')}
                right={
                  <>
                    <Box mb="8px">
                      <TextWithIcon text={record.departurePoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
                    </Box>
                    <TextWithIcon text={record.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
                  </>
                }
              />
              <Infomation
                left={t('ticketSales:departureTime')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {dayjs(record.departureTime).format('MM/DD/YYYY - HH[H]mm')}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:paxCount')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {record.rawData.totalPax}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:payment_status')}
                right={
                  <Tag
                    color={PaymentStatusColorMapping[record.paymentStatus]}
                    backgroundColor={PaymentStatusBackgroundColorMapping[record.paymentStatus]}
                    text={PaymentStatusLabelMapping[record.paymentStatus]}
                  />
                }
              />
              <Infomation
                left={t('ticketSales:createdBy')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {record.createdBy}
                  </Typography>
                }
              />
              <Infomation
                left={t('ticketSales:created_on')}
                right={
                  <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
                    {dayjs(record.createdOn).format('MM/DD/YYYY - HH[H]mm')}
                  </Typography>
                }
              />
              <Divider sx={{ borderStyle: 'dashed' }} />
              <Stack py="12px" direction="row" justifyContent="space-between" alignItems="center">
                <Typography color={theme.palette.grey[300]} fontWeight="700">
                  {t('ticketSales:total')}
                </Typography>
                <Typography fontSize={24} color="#FF2727" fontWeight="700">
                  {record.rawData.totalPrice}
                  {getAppCurrencySymbol()}
                </Typography>
              </Stack>
              <Divider sx={{ borderStyle: 'dashed', marginBottom: '16px' }} />
              <Box sx={{ maxWidth: 120, maxHeight: 120, marginLeft: 'auto', marginRight: 'auto', marginBottom: '12px' }}>
                <QRCode size={120} value={record.rawData.orderCode} />
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
