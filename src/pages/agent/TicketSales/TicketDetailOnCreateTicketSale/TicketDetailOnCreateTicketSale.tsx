import { Box, Divider, Grid, Typography } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { selectTicketSales } from 'store/ticketSales/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { TicketDetailFormValues } from './@types/FormValues';
import { LocationStateForCreateTicketSaleOneWay, LocationStateForCreateTicketSaleRoundTrip } from './@types/GeneralInfomationOfTicket';
import { Passengers } from './components/Passengers';
import { PaymentMethod } from '../../../../components/PaymentMethod';
import { PaymentStatus } from '../../../../components/PaymentStatus';
import { Reservation } from './components/Reservation';

const fieldKeys = ['email', 'method'];

export const TicketDetailOnCreateTicketSale = () => {
  const { t } = useTranslation(['ticketSales', 'translation']);

  const { statusCreateTicketSale, statusGetTicketSale } = useAppSelector(selectTicketSales);
  const { userInfo } = useAppSelector(selectAuth);

  const { ticketCode } = useParams();
  const dispatch = useDispatch();
  const location = useLocation();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
    watch,
  } = useForm<TicketDetailFormValues>({
    defaultValues: {
      method: 'PAYPAL',
      passengers: [],
    },
  });
  const { append, remove } = useFieldArray({
    control,
    name: 'passengers',
  });
  const method = watch('method');
  const passengers = watch('passengers');

  const generalInfomationOfTicket = useMemo(() => {
    return location.state as LocationStateForCreateTicketSaleOneWay | LocationStateForCreateTicketSaleRoundTrip;
  }, [location.state]);

  const isAgent = userInfo?.role === 'agent';

  const isEditAction = useMemo(() => {
    return !!ticketCode;
  }, [ticketCode]);

  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: t(`ticketSales:${key}`).toLowerCase() }),
      };
    }, {});
  }, [t]);

  const onSubmit = (values: TicketDetailFormValues) => {
    console.log(values);
  };

  useEffect(() => {
    if (ticketCode) {
      dispatch(ticketSalesActions.getTicketSaleRequest({ ticketCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ticketCode]);

  if (isEditAction && statusGetTicketSale === 'loading') {
    return <LoadingScreen />;
  }
  if (isEditAction && statusGetTicketSale === 'failure') {
    return <EmptyScreen description={t('message_error:TICKET_SALE_NOT_FOUND')} />;
  }

  if (!isEditAction && !generalInfomationOfTicket) {
    const nextUrl = isAgent ? '/agent/ticket-sales/create-ticket-order' : '/admin/ticket-sales/create-ticket-order';
    return <Navigate to={nextUrl} />;
  }

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
              <Divider sx={{ margin: '16px 0' }} />
              <PaymentMethod
                control={control}
                errors={errors}
                messages={messages}
                label="method"
                method={method}
                onChange={value => {
                  setValue('method', value);
                }}
              />
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
};
