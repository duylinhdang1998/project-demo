import { Box, Divider, Grid, List, ListItem, Stack, Typography } from '@mui/material';
import dayjs from 'dayjs';
import { Fragment, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import FileIcon from 'components/SvgIcon/FileIcon';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { VehicleEvent } from 'services/models/Vehicle';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';

const fieldsDisplay: Array<keyof VehicleEvent> = ['createdAt', 'reminderDate', 'fuelFees', 'extraFees', 'totalKilometers', 'description'];

function ListContent() {
  const { t } = useTranslation('vehicles');

  const { vehicleEvents, statusGetVehicleEvents } = useSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(
      vehicleEventsActions.getVehicleEventsRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // FIXME: Retry screen
  if (statusGetVehicleEvents === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
    <List>
      {vehicleEvents.map((item, idx) => {
        return (
          <Fragment key={item._id}>
            <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start' }}>
              <Grid container>
                {fieldsDisplay.map((key, index) => {
                  if (index !== 0) {
                    const keyTranslation = key === 'attach' ? 'attach_document' : key === 'createdAt' ? 'date' : key;
                    const label = t(`vehicles:${keyTranslation}`);
                    return (
                      <Fragment key={key}>
                        <Grid item xs={3} sx={{ padding: '10px 0' }}>
                          <Typography variant="body2">{label}:</Typography>
                        </Grid>
                        <Grid item xs={9} sx={{ padding: '10px 0' }}>
                          <Typography variant="body2">{item[key]}</Typography>
                        </Grid>
                      </Fragment>
                    );
                  }
                })}
              </Grid>
              <Stack direction="row" spacing={2} alignItems="center" py="10px">
                <FileIcon />
                <Box>
                  <Typography fontSize={14} color="#45485E">
                    {item.attach.bucketName}
                  </Typography>
                  <Typography component="span" color="#858C93" fontSize={12}>
                    {/* FIXME: Sửa format */}
                    {dayjs(item.attach.createdAt).format('DD, MMM YYYY hh:mm a')} <span>{item.attach.size}</span>
                  </Typography>
                </Box>
              </Stack>
            </ListItem>
            {idx < vehicleEvents.length - 1 && <Divider variant="middle" sx={{ border: '1.5px dashed #AEB1C5 !important' }} />}
          </Fragment>
        );
      })}
    </List>
  );
}
export default memo(ListContent);
