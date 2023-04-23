import { Divider, Typography, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnTicket } from 'pages/admin/TicketSales/components/ColumnTicket';
import { useTranslation } from 'react-i18next';
import { useStyles } from './styles';

export interface VehicleDetailProps {
  record: ColumnTicket;
}

export const VehicleDetail = (_: VehicleDetailProps) => {
  const { t } = useTranslation();
  const theme = useTheme();
  const classes = useStyles();

  return (
    <Box p="24px" bgcolor="#fff" borderRadius="4px">
      <Typography fontSize={16} color={theme.palette.grey[100]} fontWeight="700" pb="24px">
        {t('ticketSales:vehicle')}
      </Typography>
      <Divider sx={{ borderColor: '#D7DADC' }} />
      <Box display="flex" justifyContent="space-between" alignItems="center" pt="24px">
        <Box display="flex" alignItems="center">
          {/* FIXME: Lắp dữ liệu mới */}
          <img
            className={classes.image}
            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <Typography className={classes.name}>BlaBlaCar Bus | DX728AM</Typography>
        </Box>
        <Box display="flex" alignItems="center">
          <img
            className={classes.service}
            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <img
            className={classes.service}
            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
          <img
            className={classes.service}
            src="https://images.pexels.com/photos/305070/pexels-photo-305070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
          />
        </Box>
      </Box>
    </Box>
  );
};
