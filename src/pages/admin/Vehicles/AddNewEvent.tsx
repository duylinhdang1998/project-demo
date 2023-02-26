import { Box, Divider, Typography } from '@mui/material';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { selectVehicleEvents, selectVehicles } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import FormAddEvent from './components/FormAddEvent';

export default function AddNewEvent() {
  const { t } = useTranslation(['vehicles', 'translation']);

  const { statusGetVehicle, vehicle } = useAppSelector(selectVehicles);
  const { statusGetVehicleEvent } = useAppSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { vehicleId, vehicleEventId } = useParams();

  const isEditAction = useMemo(() => {
    return !!vehicleEventId;
  }, [vehicleEventId]);

  useEffect(() => {
    if (vehicleId && isEditAction && vehicleEventId) {
      dispatch(vehiclesActions.getVehicleRequest({ id: vehicleId }));
      dispatch(vehicleEventsActions.getVehicleEventRequest({ id: vehicleEventId }));
    } else {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction, vehicleEventId, vehicleId]);

  if (statusGetVehicle === 'loading' || statusGetVehicleEvent === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetVehicle === 'success' && !vehicle) {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        title={
          isEditAction
            ? t('translation:edit_type', { type: t('translation:event').toLowerCase() })
            : t('translation:add_new', { type: t('translation:event').toLowerCase() })
        }
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
