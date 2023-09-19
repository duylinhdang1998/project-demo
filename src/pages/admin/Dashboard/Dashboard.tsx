import { Grid, Stack, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { VehiclesBusIcon } from 'assets';
import CardDasboard from 'components/CardDashboard/CardDasboard';
import { FadeIn } from 'components/FadeIn/FadeIn';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetDashboard } from 'services/Dashboard/dashboard';
import TableDashboard from './components/TableDashboard';
import { statistic } from './constants';

const useStyles = makeStyles(() => ({
  iconBus: {
    width: 48,
    height: 48,
  },
  headerText: {},
  seeAll: {
    cursor: 'pointer',
  },
}));

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const theme = useTheme();
  const classes = useStyles();
  const { data, loading } = useGetDashboard();
  const navigate = useNavigate();

  const hanleSeeAllTrip = () => {
    navigate('/admin/routers');
  };

  const renderStatisticCard = () => {
    return (
      <Grid container direction="row" spacing={{ mobile: '13px', tablet: '24px' }} alignItems="strech">
        {statistic.map(i => (
          <Grid item xs={6} sm={3} key={i.text}>
            <CardDasboard {...i} text={t(`${i.text}`)} trackings={data?.trackingEvents?.trackings} />
          </Grid>
        ))}
      </Grid>
    );
  };
  const renderRouteProgram = () => {
    return (
      <Grid item xs={12} md={8}>
        <Box borderRadius={'4px'} p="24px" bgcolor="#fff" height="100%">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography fontSize={{ xs: 17, md: 20 }} fontWeight="700" color="#0C1132">
              {t('route_program')}
            </Typography>
            <Typography
              className={classes.seeAll}
              fontSize={{ xs: 14, md: 12 }}
              color={theme.palette.primary.main}
              fontWeight="700"
              onClick={hanleSeeAllTrip}
            >
              {t('see_all_trip')}
            </Typography>
          </Stack>
          <TableDashboard dataSource={data?.trackingRoutes?.hits} />
        </Box>
      </Grid>
    );
  };

  const renderVehicles = () => {
    return (
      <Grid item xs={12} md={4}>
        <Box borderRadius={'4px'} p="24px" bgcolor="#fff" height="100%">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
            <Typography fontSize={{ xs: 17, md: 20 }} fontWeight="700" color="#0C1132">
              {t('vehicles_operation')}
            </Typography>
            <Typography
              className={classes.seeAll}
              fontSize={{ xs: 14, md: 12 }}
              color={theme.palette.primary.main}
              fontWeight="700"
              onClick={() => navigate('/admin/vehicles')}
            >
              {t('see_all_vehicles')}
            </Typography>
          </Stack>
          <Box className="table-vehicles_operation">
            {data?.trackingVehicles?.hits?.map((i, index) => (
              <Stack direction="row" py="8px" justifyContent="space-between" alignItems="center" spacing={0} key={index.toString()}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <img src={VehiclesBusIcon} className={classes.iconBus} />
                  <Typography fontSize="14px" color={theme.palette.grey[100]}>
                    {i.brand}
                  </Typography>
                </Stack>
                <Typography fontSize="14px" color={theme.palette.grey[100]}>
                  {i.model}
                </Typography>
              </Stack>
            ))}
          </Box>
        </Box>
      </Grid>
    );
  };
  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t(`dashboard`)} />
      <Box p="24px">
        {loading ? (
          <LoadingScreen />
        ) : (
          <FadeIn>
            {renderStatisticCard()}
            <Grid container spacing={'24px'} my="24px" alignItems="stretch">
              {renderRouteProgram()}
              {renderVehicles()}
            </Grid>
          </FadeIn>
        )}
      </Box>
    </Box>
  );
}
