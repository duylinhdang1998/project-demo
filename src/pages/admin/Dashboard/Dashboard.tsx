import { Grid, Stack, Theme, Typography, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { VehiclesBusIcon } from 'assets';
import CardDasboard from 'components/CardDashboard/CardDasboard';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import React from 'react';
import { useTranslation } from 'react-i18next';
import TableDashboard from './components/TableDashboard';
import { statisTics, vehiclesOperations } from './constants';

const useStyles = makeStyles((theme: Theme) => ({
  iconBus: {
    width: 48,
    height: 48,
  },
  headerText: {},
}));

export default function Dashboard() {
  const { t } = useTranslation('dashboard');
  const theme = useTheme();
  const classes = useStyles();

  const renderStatisticCard = () => {
    return (
      <Grid container direction="row" spacing={{ mobile: '13px', tablet: '24px' }} alignItems="strech">
        {statisTics.map((i) => (
          <Grid item xs={6} sm={3} key={i.text}>
            <CardDasboard {...i} text={t(`${i.text}`)} />
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
            <Typography fontSize={{ xs: 14, md: 12 }} color={theme.palette.primary.main} fontWeight="700">
              {t('see_all_trip')}
            </Typography>
          </Stack>
          <TableDashboard />
        </Box>
      </Grid>
    );
  };

  const renderVihicles = () => {
    return (
      <Grid item xs={12} md={4}>
        <Box borderRadius={'4px'} p="24px" bgcolor="#fff" height="100%">
          <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={0}>
            <Typography fontSize={{ xs: 17, md: 20 }} fontWeight="700" color="#0C1132">
              {t('vehicles_operation')}
            </Typography>
            <Typography fontSize={{ xs: 14, md: 12 }} color={theme.palette.primary.main} fontWeight="700">
              {t('see_all_vehicles')}
            </Typography>
          </Stack>
          <Box className="table-vehicles_operation">
            {vehiclesOperations.map((i, index) => (
              <Stack direction="row" py="8px" justifyContent="space-between" alignItems="center" spacing={0} key={index.toString()}>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <img src={VehiclesBusIcon} className={classes.iconBus} />
                  <Typography fontSize="14px" color={theme.palette.grey[100]}>
                    {i.car}
                  </Typography>
                </Stack>
                <Typography fontSize="14px" color={theme.palette.grey[100]}>
                  {i.value}
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
        {renderStatisticCard()}
        <Grid container spacing={'24px'} my="24px" alignItems="stretch">
          {renderRouteProgram()}
          {renderVihicles()}
        </Grid>
      </Box>
    </Box>
  );
}
