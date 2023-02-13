import { Box, Checkbox, FormControlLabel, Stack, Typography } from '@mui/material';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MapPinIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import SnowSvg from 'assets/images/snow.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useToastStyle } from 'theme/toastStyles';

const dataDetails = {
  date: '27/02/2022 - 10:30 AM',
  trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'],
  operated: 'Alsa Spain',
  class: 'FLEXIBLE',
  services: ['Air conditioning', 'Luggage transport', 'Free wifi'],
  total: 20,
};

function Reservation() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const navigate = useNavigate();
  const toastClass = useToastStyle();

  const handleBook = () => {
    navigate('/agent/ticket-sales/1', { state: { isSubmit: true } });
    toast(<ToastCustom type="success" text="Order ticket successfully!" />, {
      className: toastClass.toastSuccess,
    });
  };
  return (
    <Box p="24px" bgcolor="#FAFDFF">
      <Typography marginBottom="24px" variant="h5">
        {t('your_reservation')}
      </Typography>
      <Typography variant="body2" component="p" marginBottom="16px">
        {t('date')}
      </Typography>
      <TextWithIcon icon={ClockSvg} color="#45485E" text={dataDetails.date} />
      <Typography variant="body2" component="p" margin="16px 0">
        {t('trip')}
      </Typography>
      {dataDetails.trip.map((i, index) => (
        <TextWithIcon
          key={index}
          text={i}
          icon={MapPinIcon}
          color="#1AA6EE"
          typography={{
            fontSize: '14px',
          }}
        />
      ))}
      <Typography variant="body2" component="p" margin="16px 0">
        {t('operated')}{' '}
        <Typography component="span" fontSize="14px" color="#1AA6EE" fontStyle="italic">
          {dataDetails.operated}
        </Typography>
      </Typography>
      <Typography variant="body2">
        {t('class')}: {dataDetails.class}
      </Typography>
      <Box my="16px">
        <Typography variant="body2" component="p" marginBottom="16px">
          {t('service')}
        </Typography>
        {dataDetails.services.map(i => (
          <TextWithIcon icon={SnowSvg} text={i} color="#45485E" />
        ))}
      </Box>
      <FormControlLabel
        control={<Checkbox checked />}
        label={`${t('policy_privacy')}`}
        sx={{
          '.MuiFormControlLabel-label': {
            fontSize: '14px !important',
          },
        }}
      />
      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('total_price')}</Typography>
        <Typography variant="price">${dataDetails.total}</Typography>
      </Stack>
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={handleBook}>
        {t('translation:book')}
      </Button>
    </Box>
  );
}

export default memo(Reservation);
