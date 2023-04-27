import { Box, Divider, Grid, Typography } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { PassengerInTicketSale } from 'services/models/TicketSale';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import { PaymentStatus } from '../../../../components/PaymentStatus';
import { TicketDetailFormValues } from './@types/FormValues';
import {
  GeneralInfomationOfOrder,
  LocationStateForCreateOrderOneTrip,
  LocationStateForCreateOrderRoundTrip,
} from './@types/GeneralInfomationOfOrder';
import { Passengers } from './components/Passengers';
import { seatsTypeOptions, typeTicketOptions } from './components/Passengers/const';
import { Reservation } from './components/Reservation';

const fieldKeys = ['email', 'method'];

export const OrderDetailOnCreateOrder = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const { statusCreateTicketSale, statusGetTicketSalesOfOrder, ticketSalesOfOrder } = useAppSelector(selectTicketSales);
  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { orderCode } = useParams();
  const location = useLocation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm<TicketDetailFormValues>({
    defaultValues: {
      accept_term: true,
      passengers: [],
    },
  });
  const { append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });
  const passengers = watch('passengers');

  const isAgent = userInfo?.role === 'agent';

  const isEditAction = useMemo(() => {
    return !!orderCode;
  }, [orderCode]);

  const generalInfomationOfTicket: GeneralInfomationOfOrder | null = useMemo(() => {
    if (isEditAction) {
      if (ticketSalesOfOrder?.type === 'ONE_TRIP') {
        return {
          type: 'ONE_TRIP',
          data: {
            dateFormatted: dayjs(ticketSalesOfOrder.data.departureTime).format('DD/MM/YYYY - HH:mm'),
            routePoint: ticketSalesOfOrder.data.routePoint,
            vehicle: ticketSalesOfOrder.data.vehicle,
          },
        } as LocationStateForCreateOrderOneTrip;
      }
      if (ticketSalesOfOrder?.type === 'ROUND_TRIP') {
        return {
          type: 'ROUND_TRIP',
          data: {
            departureTrip: {
              dateFormatted: dayjs(ticketSalesOfOrder.data.departureTrip.departureTime).format('DD/MM/YYYY - HH:mm'),
              routePoint: ticketSalesOfOrder.data.departureTrip.routePoint,
              vehicle: ticketSalesOfOrder.data.departureTrip.vehicle,
            },
            returnTrip: {
              dateFormatted: dayjs(ticketSalesOfOrder.data.returnTrip.departureTime).format('DD/MM/YYYY - HH:mm'),
              routePoint: ticketSalesOfOrder.data.returnTrip.routePoint,
              vehicle: ticketSalesOfOrder.data.returnTrip.vehicle,
            },
          },
        } as LocationStateForCreateOrderRoundTrip;
      }
      return null;
    }
    return location.state;
  }, [location.state, isEditAction, ticketSalesOfOrder]);

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`ticketSales:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const onSubmit = (values: TicketDetailFormValues) => {
    if (generalInfomationOfTicket) {
      if (generalInfomationOfTicket.type === 'ONE_TRIP') {
        dispatch(
          ticketSalesActions.createOrderRequest({
            type: 'ONE_TRIP',
            data: {
              passengers: values.passengers.map(passenger => ({
                firstName: passenger.firstName,
                lastName: passenger.lastName,
                typeTicket: passenger.typeTicket.value as PassengerInTicketSale['typeTicket'],
                seatsType: passenger.seatsType.value as PassengerInTicketSale['seatsType'],
              })),
              email: values.email,
              departureTime: dayjsToNumber(dayjs(generalInfomationOfTicket.data.dateFormatted)),
              arrivalPoint: generalInfomationOfTicket.data.routePoint.stopPoint,
              departurePoint: generalInfomationOfTicket.data.routePoint.departurePoint,
              routePoint: generalInfomationOfTicket.data.routePoint._id,
            },
            onSuccess(ticketSaleOrderCode) {
              toast(
                <ToastCustom
                  type="success"
                  text={t('translation:add_type_success', {
                    type: t('ticketSales:ticket').toLowerCase(),
                  })}
                />,
                { className: 'toast-success' },
              );
              navigate(isAgent ? `/agent/ticket-sales/${ticketSaleOrderCode}` : `/admin/ticket-sales/${ticketSaleOrderCode}`);
            },
            onFailure: message => {
              toast(
                <ToastCustom
                  type="error"
                  text={t('translation:add_type_error', {
                    type: t('ticketSales:ticket').toLowerCase(),
                  })}
                  description={message}
                />,
                { className: 'toast-error' },
              );
            },
          }),
        );
      }
    }
  };

  useEffect(() => {
    if (orderCode) {
      dispatch(ticketSalesActions.getTicketSaleWithOrderCodeRequest({ orderCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [orderCode]);

  useEffect(() => {
    if (isEditAction && ticketSalesOfOrder) {
      const representTicketSale = ticketSalesOfOrder.type === 'ONE_TRIP' ? ticketSalesOfOrder.data : ticketSalesOfOrder.data.departureTrip;
      reset({
        accept_term: true,
        email: representTicketSale.email,
        passengers: representTicketSale.passengers.map(passenger => ({
          firstName: passenger.firstName,
          lastName: passenger.lastName,
          seatsType: seatsTypeOptions.find(option => option.value === passenger.seatsType),
          typeTicket: typeTicketOptions.find(option => option.value === passenger.typeTicket),
        })),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [generalInfomationOfTicket]);

  // Update ticket sale
  if (isEditAction && statusGetTicketSalesOfOrder === 'loading') {
    return <LoadingScreen />;
  }
  if (isEditAction && statusGetTicketSalesOfOrder === 'failure') {
    return <EmptyScreen description={t('message_error:TICKET_SALE_NOT_FOUND')} />;
  }

  if (!isEditAction && !generalInfomationOfTicket) {
    const nextUrl = isAgent ? '/agent/ticket-sales/create-ticket-order' : '/admin/ticket-sales/create-ticket-order';
    return <Navigate to={nextUrl} />;
  }
  if (generalInfomationOfTicket) {
    return (
      <LayoutDetail title={t('ticketSales:create_ticket_order')} subTitle={t('ticketSales:ticket_sales')}>
        <Box width="100%" display="flex" justifyContent="center">
          <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                <Typography variant="h5">{t('ticketSales:traveller_contact_details')}</Typography>
                <Divider sx={{ margin: '16px 0' }} />
                <Passengers
                  append={append}
                  remove={remove}
                  control={control}
                  errors={errors}
                  passengers={passengers}
                  generalInfomationOfTicket={generalInfomationOfTicket}
                />
                <Divider sx={{ margin: '16px 0' }} />
                <FormVerticle
                  control={control}
                  errors={errors}
                  messages={messages}
                  filterKey="ticketSales"
                  fields={[
                    {
                      id: 'email',
                      label: 'email',
                      type: 'email',
                      required: true,
                      description: t('ticketSales:email_field_description'),
                    },
                  ]}
                />
                <Divider sx={{ margin: '16px 0' }} />
                <PaymentStatus isActive={true} />
              </Grid>
              <Grid item xs={12} md={4}>
                <Reservation
                  errors={errors}
                  control={control}
                  loading={statusCreateTicketSale === 'loading'}
                  onSubmit={handleSubmit(onSubmit)}
                  passengers={passengers}
                  generalInfomationOfTicket={generalInfomationOfTicket}
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </LayoutDetail>
    );
  }
  return null;
};