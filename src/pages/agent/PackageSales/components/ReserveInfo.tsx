import { Box, Stack, Typography } from '@mui/material';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { MapPinIcon } from 'assets';
import ClockSvg from 'assets/images/clock.svg';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { get } from 'lodash-es';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';

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

interface Props {
  onBook?: () => void;
  loading?: boolean;
}

function ReserveInfo({ onBook, loading }: Props) {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const location = useLocation();
  const selectedRoute: RouteOfTicketSale = get(location, 'state.selectedRoute', undefined);

  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleBook = () => {
    onBook?.();
    // setOpen(true);
    // navigate('/agent/package-sales/create-package-orders/order-confirm');
    // toast(<ToastCustom type="success" text="Order ticket successfully!" />, {
    //   className: 'toast-success',
    // });
  };
  return (
    <Box p="24px" bgcolor="#FAFDFF">
      {/* <Typography marginBottom="24px" variant="h5">
        {t('your_reservation')}
      </Typography> */}
      <Typography variant="body2" component="p" marginBottom="16px">
        {t('date')}
      </Typography>
      <TextWithIcon icon={ClockSvg} color="#45485E" text={selectedRoute.route.departureTime} />
      <Typography variant="body2" component="p" margin="16px 0">
        {t('trip')}
      </Typography>
      <TextWithIcon
        text={selectedRoute.departurePoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />
      <TextWithIcon
        text={selectedRoute.stopPoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />

      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2">{t('total_price')}</Typography>
        <Typography variant="price">${dataDetails.total}</Typography>
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
}

export default memo(ReserveInfo);
