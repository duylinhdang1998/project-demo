import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Box, Divider, Grid, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import Empty from 'assets/images/empty-result.svg';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import Qrcode from 'components/Qrcode/Qrcode';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { TicketStatus } from 'components/TicketStatus/TicketStatus';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash-es';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { TicketSale } from 'services/models/TicketSale';
import { UserRoleMappingToLabel } from 'services/models/UserRole';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { Infomation } from './Infomation';
import { useStyles } from './styles';
import { getOrderCodeFromScanQr } from 'utils/getOrderCodeFromScanQr';
import { selectAuth } from 'store/auth/selectors';

export default function ControlTicket() {
  const { t } = useTranslation(['dashboard', 'ticketSales']);
  const classes = useStyles();

  const [showPassengersDetail, setShowPassengersDetail] = useState(false);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetTicketSalesOfOrder, queueUpdateOrderStatus, ticketSalesOfOrder } = useAppSelector(selectTicketSales);
  const dispatch = useAppDispatch();

  const ticketSale: TicketSale | null = useMemo(() => {
    if (ticketSalesOfOrder?.type === 'ONE_TRIP') {
      return ticketSalesOfOrder.data;
    }
    if (ticketSalesOfOrder?.type === 'ROUND_TRIP') {
      return ticketSalesOfOrder.data.departureTrip;
    }
    return null;
  }, [ticketSalesOfOrder]);

  const handleConfirmCheckIn = () => {
    if (ticketSale) {
      dispatch(
        ticketSalesActions.updateOrderStatusRequest({
          orderCode: ticketSale.orderCode,
          targetTicket: ticketSale,
          ticketStatus: 'USED',
          onSuccess: () => {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('ticketSales:ticketSale').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('ticketSales:ticketSale').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
  };

  const renderTablePassenger = () => {
    if (!showPassengersDetail) {
      return null;
    }
    return (
      <TableContainer className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.recordTitle}>{t('ticketSales:lastName')}</TableCell>
              <TableCell className={classes.recordTitle}>{t('ticketSales:firstName')}</TableCell>
              <TableCell className={classes.recordTitle} align="center">
                {t('ticketSales:ticketType')}
              </TableCell>
              <TableCell className={classes.recordTitle} align="center">
                {t('ticketSales:price')}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {ticketSale?.passengers.map(({ lastName, firstName, typeTicket, price }, index) => (
              <TableRow key={index}>
                <TableCell align="left" className={classes.recordValue}>
                  {lastName}
                </TableCell>
                <TableCell className={classes.recordValue}>{firstName}</TableCell>
                <TableCell className={classes.recordValue} align="center">
                  {typeTicket}
                </TableCell>
                <TableCell className={classes.recordValue} align="center">
                  {price}
                  {getAppCurrencySymbol()}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    );
  };

  const renderRight = () => {
    if (statusGetTicketSalesOfOrder === 'loading') {
      return (
        <Box sx={{ position: 'relative' }} display="flex" alignItems="center" justifyContent="center">
          <LoadingScreen />
        </Box>
      );
    }

    if (!ticketSale) {
      return (
        <Box display="flex" alignItems="center" justifyContent="center">
          <img src={Empty} alt="Empty" />
        </Box>
      );
    }

    return (
      <>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5">
            {t('ticketSales:order')} #{ticketSale?.orderCode}
          </Typography>
          <TicketStatus status={ticketSale.ticketStatus} sx={{ textTransform: 'uppercase !important' }} />
        </Stack>
        <Divider sx={{ margin: '16px 0' }} />
        <Box marginBottom="24px">
          <Infomation
            left={t('ticketSales:trip')}
            right={
              <>
                <Box my="2px">
                  <TextWithIcon text={ticketSale?.departurePoint} icon={MapPinIcon} color="#1AA6EE" />
                </Box>
                <Box my="2px">
                  <TextWithIcon text={ticketSale?.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" />
                </Box>
              </>
            }
          />
          <Infomation left={t('ticketSales:lastName')} right={get(ticketSale?.passengers, 0)?.lastName} />
          <Infomation left={t('ticketSales:firstName')} right={get(ticketSale?.passengers, 0)?.firstName} />
          <Infomation left={t('ticketSales:date_time')} right={dayjs(ticketSale?.departureTime).format('DD/MM/YYYY - HH[H]mm')} />
          <Infomation
            left={t('ticketSales:number_of_pax')}
            right={
              <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Box>{ticketSale?.passengers.length}</Box>
                <Box className={classes.detailButton} onClick={() => setShowPassengersDetail(state => !state)}>
                  <Typography marginRight="4px" fontSize="12px">
                    {showPassengersDetail ? t('ticketSales:passengers_show_less') : t('ticketSales:passengers_show_detail')}
                  </Typography>
                  <ArrowDownwardIcon fontSize="inherit" />
                </Box>
              </Stack>
            }
          />
          {renderTablePassenger()}
          <Infomation
            left={t('ticketSales:payment_status')}
            right={
              <Tag
                color={PaymentStatusColorMapping[ticketSale?.paymentStatus]}
                backgroundColor={PaymentStatusBackgroundColorMapping[ticketSale?.paymentStatus]}
                text={PaymentStatusLabelMapping[ticketSale?.paymentStatus]}
              />
            }
          />
          <Infomation left={t('ticketSales:created_by')} right={UserRoleMappingToLabel[ticketSale.creatorType]} />
          <Infomation left={t('ticketSales:created_on')} right={dayjs(ticketSale?.createdAt).format('DD/MM/YYYY - HH[H]mm')} />
          <Infomation left={t('ticketSales:total')} right={`${ticketSale?.totalPrice}${getAppCurrencySymbol()}`} />
        </Box>
        {ticketSale.ticketStatus === 'PENDING' && (
          <Button
            fullWidth
            backgroundButton="rgba(26, 166, 238, 1)"
            onClick={handleConfirmCheckIn}
            loading={queueUpdateOrderStatus.includes(ticketSale._id)}
          >
            {t('ticketSales:confirm_checkin')}
          </Button>
        )}
      </>
    );
  };

  return (
    <LayoutDetail title={t('control_ticket')}>
      <CardWhite title={t('order_checking')}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Qrcode
              code="123"
              onScanQR={result => {
                dispatch(
                  ticketSalesActions.getTicketSaleWithOrderCodeRequest({
                    orderCode: getOrderCodeFromScanQr(userInfo?.role, result.data),
                    onTicketNonExist() {
                      toast(<ToastCustom type="error" text={t('translation:invalid_qrcode')} />, { className: 'toast-error' });
                    },
                    onFailure(message) {
                      toast(
                        <ToastCustom
                          type="error"
                          text={t('ticketSales:find_ticket_error', { type: t('account:content_manager').toLowerCase() })}
                          description={message}
                        />,
                        { className: 'toast-error' },
                      );
                    },
                  }),
                );
              }}
              onSearch={value => dispatch(ticketSalesActions.getTicketSaleWithOrderCodeRequest({ orderCode: value }))}
            />
          </Grid>
          <Grid item xs={12} md={8}>
            <Box bgcolor="#FAFDFF" borderRadius="4px" padding="24px">
              {renderRight()}
            </Box>
          </Grid>
        </Grid>
      </CardWhite>
    </LayoutDetail>
  );
}
