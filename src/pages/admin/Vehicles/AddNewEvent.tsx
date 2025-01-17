import { Box, Divider, Typography } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { selectVehicleEvents, selectVehicles } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import FormAddEvent from './components/FormAddEvent';

export default function AddNewEvent() {
  const { t } = useTranslation(['vehicles', 'translation', 'message_error']);

  const { statusGetVehicle, vehicle } = useAppSelector(selectVehicles);
  const { statusGetVehicleEvent } = useAppSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { vehicleId, vehicleEventId } = useParams();

  const isEditAction = useMemo(() => {
    return !!vehicleEventId;
  }, [vehicleEventId]);

  useEffect(() => {
    if (!vehicleId) {
      navigate('/404');
    } else {
      dispatch(vehiclesActions.getVehicleRequest({ id: vehicleId }));
      if (isEditAction && vehicleEventId) {
        dispatch(vehicleEventsActions.getVehicleEventRequest({ id: vehicleEventId }));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction, vehicleEventId, vehicleId]);

  if (statusGetVehicle === 'loading' || statusGetVehicleEvent === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetVehicle === 'failure' || (statusGetVehicle === 'success' && !vehicle)) {
    return <EmptyScreen description={t('message_error:VEHICLE_EVENT_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        title={isEditAction ? t('translation:edit_type', { type: t('translation:event').toLowerCase() }) : t('vehicles:add_new_event')}
        subTitle={t('vehicles:vehicles')}
      >
        <Box display="flex" justifyContent="center" width="100%">
          <Box padding="24px" sx={{ backgroundColor: '#fff' }} borderRadius="4px" width={{ xs: '100%', md: '80%' }}>
            <Typography fontSize={16} fontWeight="700">
              {isEditAction ? t('translation:edit') : t('vehicles:add_event_for')} {vehicle?.registrationId}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <FormAddEvent />
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
