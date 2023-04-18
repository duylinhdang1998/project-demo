import { Box, Dialog, Divider, Grid } from '@mui/material';
import { Route } from 'services/models/Route';
import { GeneralInfomation } from './GeneralInfomation';
import { MainRoute } from './MainRoute';
import { SubRoute } from './SubRoute';
import { Title } from './Title';

export interface DialogMultiStopTripDetailProps {
  route: Route;
  onClose: () => void;
  onUpdateRoutePointPrice: (route: Route) => void;
}
export const DialogMultiStopTripDetail = ({ route, onClose, onUpdateRoutePointPrice }: DialogMultiStopTripDetailProps) => {
  return (
    <Dialog maxWidth="desktop" open onClose={onClose}>
      <Box padding="24px">
        <Title route={route} onClose={onClose} />
        <Divider variant="middle" sx={{ margin: '16px 0' }} />
        <GeneralInfomation route={route} />
        <Grid container spacing={2} style={{ marginBottom: '24px' }}>
          <MainRoute route={route} />
          <SubRoute onUpdateRoutePointPrice={onUpdateRoutePointPrice} route={route} />
        </Grid>
      </Box>
    </Dialog>
  );
};
