import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MapPinIcon, VehiclesBusIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { get } from 'lodash-es';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import { getUrlImage, getUrlOfResource } from 'utils/getUrlOfResource';
import { Title } from 'pages/agent/TicketSales/OrderDetailOnCreateOrder/components/Reservation/components/TripInfomation';
import { Control, Controller, FieldErrors, useWatch } from 'react-hook-form';
import dayjs from 'dayjs';
import { FieldValues } from '../ClientInfo';
import { isEmpty } from 'ramda';
import { useUpdateEffect } from 'ahooks';

interface Props {
  onBook?: () => void;
  loading?: boolean;
  routeDetail?: RouteOfTicketSale;
  control: Control<FieldValues>;
  errors: FieldErrors<FieldValues>;
}

const ReserveInfo = ({ onBook, loading, routeDetail, control, errors }: Props) => {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const merchandisesValue = useWatch({
    control,
    name: 'merchandise',
  });

  useUpdateEffect(() => {
    if (!isEmpty(merchandisesValue)) {
      const total = merchandisesValue.reduce((total, item) => {
        return (total += parseInt(item.price));
      }, 0);
      if (Number.isNaN(total)) {
        setTotalPrice(prev => prev);
        return;
      }
      setTotalPrice(total);
    }
  }, [merchandisesValue]);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = () => {
    onBook?.();
  };

  const renderVehicle = () => {
    const vehicle = routeDetail?.vehicle;
    return (
      <Box marginY="24px">
        <Title>{t('ticketSales:vehicle')}</Title>
        <Stack direction="row" alignItems="center" spacing={2}>
          <img
            src={
              typeof vehicle?.attach === 'string'
                ? getUrlImage(vehicle.attach)
                : vehicle?.attach && typeof vehicle?.attach === 'object'
                ? getUrlOfResource(vehicle?.attach)
                : VehiclesBusIcon
            }
            width={24}
            style={{
              objectFit: 'cover',
              borderRadius: '50%',
            }}
          />
          <Typography sx={{ marginLeft: '8px !important' }} fontSize="14px" color="rgba(69, 72, 94, 1)">
            {vehicle?.brand} | {vehicle?.model}
          </Typography>
        </Stack>
      </Box>
    );
  };

  const renderVehicleServices = () => {
    return (
      <Box>
        <Title>{t('ticketSales:service')}</Title>
        {routeDetail?.vehicle?.services?.map(i => (
          <Box marginBottom="12px">
            <TextWithIcon icon={getUrlImage(i.icon)} text={i.title} color="#45485E" />
          </Box>
        ))}
      </Box>
    );
  };

  const renderAgreeTerms = () => {
    return (
      <Controller
        control={control}
        name="accept_term"
        rules={{ required: true }}
        defaultValue={true}
        render={({ field }) => {
          return (
            <>
              <FormControlLabel
                control={<Checkbox {...field} checked={field.value} sx={{ paddingY: 0 }} />}
                label={`${t('ticketSales:policy_privacy', { busName: routeDetail?.vehicle?.model })}`}
                sx={{
                  alignItems: 'flex-start !important',
                  '.MuiFormControlLabel-label': {
                    fontSize: '10px !important',
                    color: 'rgba(71, 84, 97, 1) !important',
                  },
                }}
              />
              {!!errors['accept_term'] && (
                <Typography component="p" sx={{ marginTop: '4px', color: '#FF2727' }} fontSize={10}>
                  {t('ticketSales:terms_agree_invalid')}
                </Typography>
              )}
            </>
          );
        }}
      />
    );
  };

  return (
    <Box p="24px" bgcolor="#FAFDFF">
      <Typography variant="body2" component="p" marginBottom="16px" fontWeight={700}>
        {t('date')}
      </Typography>
      <TextWithIcon icon={ClockSvg} color="#45485E" text={dayjs(get(location, 'state.departureTime', undefined)).format('MM/DD/YYYY HH:mm')} />
      <Typography variant="body2" component="p" margin="16px 0" fontWeight={700}>
        {t('trip')}
      </Typography>
      <TextWithIcon
        text={routeDetail?.departurePoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />
      <TextWithIcon
        text={routeDetail?.stopPoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />
      {renderVehicle()}

      {renderVehicleServices()}

      {renderAgreeTerms()}

      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('total_price')}</Typography>
        <Typography variant="price">${totalPrice}</Typography>
      </Stack>
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={handleBook} loading={loading}>
        {t('translation:next')}
      </Button>
      <DialogConfirm
        openDialog={open}
        title={t('translation:cancel_type', { type: t('package_order').toLowerCase() })}
        subTitle={t('translation:leave_page')}
        onClose={handleClose}
      />
    </Box>
  );
};

export default ReserveInfo;
