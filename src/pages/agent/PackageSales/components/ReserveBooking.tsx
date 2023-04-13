import React, { memo } from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { orderConfirmSelector } from 'store/passengers/selectors';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ClockSvg from 'assets/images/clock.svg';
import PhoneSvg from 'assets/images/phone.svg';
import UserSvg from 'assets/images/user.svg';

import Button from 'components/Button/Button';
import { MapPinIcon } from 'assets';

interface Props {
  onBook?: () => void;
  loading?: boolean;
}

function ReserveBooking({ onBook, loading }: Props) {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const orderInfomation = useSelector(orderConfirmSelector);

  return (
    <Box p="24px" bgcolor="#FAFDFF">
      <Typography marginBottom="24px" variant="h5">
        {t('your_reservation')}
      </Typography>
      <Typography variant="body2" component="p" marginBottom="16px" fontWeight={600}>
        {t('date')}
      </Typography>
      <TextWithIcon icon={ClockSvg} color="#45485E" text={orderInfomation.departureTime} />
      <Typography variant="body2" component="p" margin="16px 0" fontWeight={600}>
        {t('trip')}
      </Typography>
      <TextWithIcon
        text={orderInfomation.departurePoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />
      <TextWithIcon
        text={orderInfomation.arrivalPoint}
        icon={MapPinIcon}
        color="#1AA6EE"
        typography={{
          fontSize: '14px',
        }}
      />
      <Typography variant="body2" component="p" margin="16px 0" fontWeight={600}>
        {t('translation:sender')}
      </Typography>
      <TextWithIcon
        text={orderInfomation.sender?.firstName + ' ' + orderInfomation.sender?.lastName}
        icon={UserSvg}
        typography={{
          fontSize: '14px',
        }}
      />
      <TextWithIcon
        text={orderInfomation.sender?.mobile}
        icon={PhoneSvg}
        typography={{
          fontSize: '14px',
        }}
      />
      <Typography variant="body2" component="p" margin="16px 0" fontWeight={600}>
        {t('translation:recipent')}
      </Typography>
      <TextWithIcon
        text={orderInfomation.recipent?.firstName + ' ' + orderInfomation.recipent?.lastName}
        icon={UserSvg}
        typography={{
          fontSize: '14px',
        }}
      />
      <TextWithIcon
        text={orderInfomation.recipent?.mobile}
        icon={PhoneSvg}
        typography={{
          fontSize: '14px',
        }}
      />

      <Stack direction="row" alignItems="center" spacing={10} marginTop="20px">
        <Typography variant="body2" fontWeight={600}>
          {t('total_price')}
        </Typography>
        <Typography variant="price">$20</Typography>
      </Stack>
      <Typography variant="headerTable">{t('all_taxes_and_fees')}</Typography>
      <Button backgroundButton="#1AA6EE" fullWidth sx={{ marginTop: '24px' }} onClick={onBook} loading={loading}>
        {t('translation:book')}
      </Button>
    </Box>
  );
}

export default memo(ReserveBooking);
