import { Divider, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import { useTranslation } from 'react-i18next';
import { getUrlImage, getUrlOfResource } from 'utils/getUrlOfResource';
import { useStyles } from './styles';
import BusPng from 'assets/images/bus.png';

export interface VehicleDetailProps {
  record: ColumnTicket;
}

export const VehicleDetail = ({ record }: VehicleDetailProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  const vehicle = record.rawData.vehicle;

  return (
    <Box p="24px" bgcolor="#fff" borderRadius="4px">
      <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
        {t('ticketSales:vehicle')}
      </Typography>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" pt="24px">
        <Box display="flex" alignItems="center">
          <img
            className={classes.image}
            src={
              typeof vehicle?.attach === 'string'
                ? getUrlImage(vehicle.attach)
                : vehicle?.attach && typeof vehicle?.attach === 'object'
                ? getUrlOfResource(vehicle?.attach)
                : BusPng
            }
          />
          <Typography className={classes.name}>
            {vehicle?.brand} | {vehicle?.model}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {vehicle?.services?.map((service, index) => {
            if (typeof service === 'string') {
              return <img key={index} alt={service} src={getUrlImage(service)} className={classes.service} />;
            }
            return <img key={service._id} alt={service.title} src={getUrlImage(service.icon)} className={classes.service} />;
          })}
        </Box>
      </Box>
    </Box>
  );
};
