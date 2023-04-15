import { Box, Divider, Grid, Typography } from '@mui/material';
import ComboButton from 'components/ComboButtonSaveCancel/ComboButton';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Passenger } from 'services/models/Passenger';
import { selectAuth } from 'store/auth/selectors';
import { passengersActions } from 'store/passengers/passengersSlice';
import { selectPassengers } from 'store/passengers/selectors';
import TableOrdersOfPassenger from './components/TableOrdersOfPassenger';
import { fieldDetails } from './constants';

type Values = Pick<Passenger, 'country' | 'email' | 'firstName' | 'lastName' | 'phone'>;

const fieldKeys: Array<keyof Values> = ['country', 'email', 'firstName', 'lastName', 'phone'];
export default function PassengerDetail() {
  const { t } = useTranslation(['passenger', 'translation', 'message_error']);
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<Values>();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { passengerId } = useParams();

  const { userInfo } = useAppSelector(selectAuth);
  const { passenger, statusGetPassenger, queueUpdatePassenger } = useAppSelector(selectPassengers);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';
  const route = isAgent ? '/agent/passengers/' : '/admin/passengers/';
  const isEditAction = useMemo(() => {
    return !!location.state?.isEdit;
  }, [location.state?.isEdit]);
  const messages = useMemo(() => {
    return fieldKeys.reduce<Record<string, string>>((res, key) => {
      return {
        ...res,
        [key]: t('translation:error_required', { name: key }),
      };
    }, {});
  }, [t]);

  const handleClose = () => {
    setOpen(false);
  };
  const handleCancel = () => setOpen(true);

  const onSubmit = (values: Values) => {
    if (passengerId) {
      dispatch(
        passengersActions.updatePassengerRequest({
          id: passengerId,
          data: {
            country: values.country,
            firstName: values.firstName,
            lastName: values.lastName,
            phone: values.phone,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('passenger:passenger') })} />, {
              className: 'toast-success',
            });
            navigate(route);
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('passenger:passenger') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  useEffect(() => {
    if (passengerId) {
      dispatch(
        passengersActions.getPassengerRequest({
          id: passengerId,
        }),
      );
    } else {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passengerId]);

  useEffect(() => {
    if (passenger) {
      reset({
        country: passenger.country,
        email: passenger.email,
        firstName: passenger.firstName,
        lastName: passenger.lastName,
        phone: passenger.phone,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [passenger]);

  if (statusGetPassenger === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetPassenger === 'success' && !passenger) {
    return <EmptyScreen description={t('message_error:PASSENGER_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <LayoutDetail title={t('passenger:details')} subTitle={t('passenger:passengers')}>
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {isEditAction ? t('translation:edit_type', { type: t('passenger:passenger') }) : t('passenger:details')}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <Grid container spacing={2}>
              <Grid item xs={12} lg={6}>
                <Typography fontSize="14px" fontWeight="bold" marginBottom="16px">
                  {t('passenger:account_created')} {dayjs(new Date(passenger?.createdAt as string)).format('MM/DD/YYYY')}
                </Typography>
                <FormVerticle
                  errors={errors}
                  messages={messages}
                  fields={fieldDetails}
                  control={control}
                  filterKey={'passenger'}
                  inputProps={{
                    disabled: !isEditAction,
                  }}
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TableOrdersOfPassenger orders={passenger?.orders ?? []} />
              </Grid>
            </Grid>
            {isEditAction && (
              <ComboButton
                isSaving={!!passengerId && queueUpdatePassenger.includes(passengerId)}
                onCancel={handleCancel}
                onSave={handleSubmit(onSubmit)}
              />
            )}
          </Box>
        </Box>
        <DialogConfirm
          openDialog={open}
          title={t('translation:cancel_type', { type: t('passenger').toLowerCase() })}
          subTitle={t('translation:leave_page')}
          onClose={handleClose}
        />
      </LayoutDetail>
    </FadeIn>
  );
}
