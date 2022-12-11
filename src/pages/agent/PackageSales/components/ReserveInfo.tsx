import { Box, Stack, Typography } from '@mui/material';
import { MapPinIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import PhoneSvg from 'assets/images/phone.svg';
import UserSvg from 'assets/images/user.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useToastStyle } from 'theme/toastStyles';

const dataDetails = {
  date: '27/02/2022 - 10:30 AM',
  trip: ['Lyon Gare Perrache', 'Lyon Gare Perrache'],
  sender: {
    name: 'Payoun Samia',
    phone: '0123456789',
  },
  recipient: {
    name: 'Payoun Samia',
    phone: '0123456789',
  },
  total: 20,
};

function ReserveInfo() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const navigate = useNavigate();
  const toastClass = useToastStyle();

  const handleBook = () => {
    navigate('/agent/create-package-orders/order-confirm');
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
        {t('translation:sender')}
      </Typography>
      <Box mb="16px">
        <TextWithIcon text={dataDetails.sender.name} icon={UserSvg} />
        <TextWithIcon text={dataDetails.sender.phone} icon={PhoneSvg} />
      </Box>

      <Typography variant="body2">{t('translation:recipent')}</Typography>
      <Box mb="16px">
        <TextWithIcon text={dataDetails.recipient.name} icon={UserSvg} />
        <TextWithIcon text={dataDetails.recipient.phone} icon={PhoneSvg} />
      </Box>
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

export default memo(ReserveInfo);
