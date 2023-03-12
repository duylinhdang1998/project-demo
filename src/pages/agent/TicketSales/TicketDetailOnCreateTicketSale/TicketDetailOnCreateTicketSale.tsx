import { Box, Divider, Grid, Typography } from '@mui/material';

import FormVerticle from 'components/FormVerticle/FormVerticle';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { Option } from 'models/Field';
import { useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Route, StopPointPrice } from 'services/models/Route';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { Passengers } from './components/Passengers';
import { PaymentMethod } from './components/PaymentMethod';
import { Reservation } from './components/Reservation';

export interface Passenger {
  firstName: string;
  lastName: string;
  ticketType: Option<keyof StopPointPrice>; // FIXME: Liệu có đúng ?
}

export interface TicketDetailFormValues {
  email: string;
  method: 'credit'; // FIXME: Enum
  passengers: Passenger[];
}

const fieldKeys = ['email', 'method'];

export const TicketDetailOnCreateTicketSale = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusCreateTicketSale } = useAppSelector(selectTicketSales);
  const dispatch = useAppDispatch();

  const location = useLocation();
  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    getValues,
  } = useForm<TicketDetailFormValues>({
    defaultValues: {
      method: 'credit',
      passengers: [],
    },
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });

  const isAgent = userInfo?.role === 'agent';
  const route = location.state as Route | undefined;
  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const getPaymentMethod = (): TicketDetailFormValues['method'] => {
    return getValues().method;
  };

  const onSubmit = (values: TicketDetailFormValues) => {
    console.log(values);
    if (route) {
      dispatch(
        ticketSalesActions.createTicketSaleRequest({
          data: {
            passengers: values.passengers.map(passenger => ({
              firstName: passenger.firstName,
              lastName: passenger.lastName,
              typeTicket: passenger.ticketType.value as string,
              // FIXME: Cái này đâu ra ?
              seatsType: 'ECO',
            })),
            email: values.email,
            route: route._id,
            // FIXME: Đợi BE update API
            departureTime: 0,
            // FIXME: Đợi BE update API
            arrivalPoint: 'Hà Nội',
            departurePoint: route.departurePoint,
          },
          onSuccess(ticketSaleId) {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('ticketSales:ticket'),
                })}
              />,
              { className: 'toast-success' },
            );
            navigate(isAgent ? `/agent/ticket-sales/${ticketSaleId}` : `/admin/ticket-sales/${ticketSaleId}`);
          },
          onFailure() {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', {
                  type: t('ticketSales:ticket'),
                })}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
    // navigate('/agent/ticket-sales/1', {
    //   state: { isSubmit: true },
    // });
  };

  if (!route) {
    return <Navigate to={isAgent ? '/agent/ticket-sales' : '/admin/ticket-sales'} />;
  }

  return (
    <LayoutDetail title={t('ticketSales:create_ticket_orders')} subTitle={t('ticketSales:ticket_sales')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5">{t('ticketSales:traveller_contact_details')}</Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <Passengers append={append} remove={remove} control={control} errors={errors} passengers={fields} />
              <Divider sx={{ margin: '16px 0' }} />
              <FormVerticle
                control={control}
                errors={errors}
                messages={messages}
                filterKey="ticketSales"
                fields={[{ id: 'email', label: 'email', type: 'email', required: true }]}
              />
              <Divider sx={{ margin: '16px 0' }} />
              <PaymentMethod
                control={control}
                errors={errors}
                messages={messages}
                label="method"
                method={getPaymentMethod()}
                onChange={value => {
                  setValue('method', value);
                }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <Reservation loading={statusCreateTicketSale === 'loading'} route={route} onSubmit={handleSubmit(onSubmit)} />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LayoutDetail>
  );
};
