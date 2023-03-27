import { Box, Grid, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Timeline } from 'antd';
import 'antd/lib/timeline/style/css';
import Button from 'components/Button/Button';
import { useStyles } from 'pages/admin/Routers/components/DialogMultiStopTripDetail/SubRoute';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteOfTicketSale } from 'services/models/TicketSale';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import './styles.css';
import BusPng from 'assets/images/bus.png';

const useMainStyles = makeStyles(() => ({
  root: {
    boxShadow: '0px 4px 16px rgba(0, 0, 0, 0.1)',
    borderRadius: '4px',
    border: '1px solid #F7F7F7',
  },
  img: {
    width: 40,
    height: 40,
  },
  icon: {
    width: 16,
    height: 16,
  },
  timeline: {
    height: '60px',
  },
}));

interface CardSelectTripProps {
  timeStart?: string;
  placeStart?: string;
  timeEnd?: string;
  placeEnd?: string;
  vehicle?: RouteOfTicketSale['vehicle'];
  ECOPrices?: RouteOfTicketSale['ECOPrices'];
  VIPPrices?: RouteOfTicketSale['VIPPrices'];
  duration?: string;
  onSelect?: () => void;
}

function CardSelectTrip({ timeEnd, timeStart, placeEnd, placeStart, vehicle, ECOPrices, VIPPrices, duration, onSelect }: CardSelectTripProps) {
  const mainClasses = useMainStyles();
  const blockPricesClasses = useStyles();
  const { t } = useTranslation(['translation', 'routers']);

  const renderBlockPrices = () => {
    return (
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item flex="1 1 auto">
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Box className={blockPricesClasses.ticketTypeIcon} bgcolor="rgba(51, 204, 127, 1)">
                {t('routers:ECO')}
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Adult')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {ECOPrices?.ADULT}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box className={blockPricesClasses.ticketTypeDivider}>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Student')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {ECOPrices?.STUDENT}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Children')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {ECOPrices?.CHILD}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <Box bgcolor="rgba(255, 182, 0, 1)" className={blockPricesClasses.ticketTypeIcon}>
                {t('routers:VIP')}
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Adult')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {VIPPrices?.ADULT}
                </Typography>
              </Box>
            </Grid>
            <Grid item lg={4}>
              <Box className={blockPricesClasses.ticketTypeDivider}>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Student')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {VIPPrices?.STUDENT}
                </Typography>
              </Box>
            </Grid>
            <Grid item>
              <Box>
                <Typography component="span" className={blockPricesClasses.ticketTypeTitle}>
                  {t('routers:Children')}:
                </Typography>
                <Typography component="span" className={blockPricesClasses.ticketTypeValue}>
                  {getAppCurrencySymbol()}
                  {VIPPrices?.CHILD}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  };

  return (
    <Box className={mainClasses.root} padding="24px 16px" marginBottom="20px">
      <Stack
        direction={{ mobile: 'column', desktop: 'row' }}
        justifyContent="space-between"
        spacing={2}
        alignItems={{ xs: 'flex-start', md: 'center' }}
      >
        <Box flex="35%" className="ticket_sales_custom_timeline_container">
          <Timeline mode="left" className={mainClasses.timeline}>
            <Timeline.Item color="#333" label={timeStart}>
              {placeStart}
            </Timeline.Item>
            <Timeline.Item color="#333" label={timeEnd}>
              {placeEnd}
            </Timeline.Item>
          </Timeline>
        </Box>
        <Box flex="auto">
          {renderBlockPrices()}
          <Typography sx={{ marginTop: '12px', marginRight: '12px' }} textAlign="right" fontSize={12} color="#B2BABE">
            {duration}
          </Typography>
        </Box>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center" my="16px">
        <Stack direction="row" alignItems="center" spacing={2}>
          <img src={vehicle?.attach?.thumbnail ?? BusPng} className={mainClasses.img} />
          <Typography variant="body2">{vehicle?.brand}</Typography>
        </Stack>
        <Stack spacing={2} direction="row" alignItems="center">
          <i className={`fas fa-wifi ${mainClasses.icon}`} />
          <i className={`fas fa-tv-alt ${mainClasses.icon}`} />
          <i className={`fas fa-tint ${mainClasses.icon}`} />
        </Stack>
      </Stack>
      <Button variant="outlined" fullWidth onClick={onSelect}>
        {t('select')}
      </Button>
    </Box>
  );
}

export default memo(CardSelectTrip);
