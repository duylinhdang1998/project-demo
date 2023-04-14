import { Box, Divider, Typography } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import FormAddVehicle from './components/FormAddVehicle';

export default function AddNewVehicles() {
  const { t } = useTranslation(['vehicles', 'translation', 'message_error']);

  const { statusGetVehicle, vehicle } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const { vehicleId } = useParams();

  const isEditAction = useMemo(() => {
    return !!vehicleId;
  }, [vehicleId]);

  useEffect(() => {
    if (isEditAction && vehicleId) {
      dispatch(vehiclesActions.getVehicleRequest({ id: vehicleId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  if (statusGetVehicle === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetVehicle === 'failure' || (statusGetVehicle === 'success' && !vehicle)) {
    return <EmptyScreen description={t('message_error:VEHICLE_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        title={
          isEditAction
            ? t('translation:edit_type', { type: t('vehicles:vehicle').toLowerCase() })
            : t('translation:add_new', { type: t('vehicles:vehicle').toLowerCase() })
        }
        subTitle={t('vehicles:vehicles')}
      >
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <Typography color="#0c1132" fontWeight={700}>
              {isEditAction
                ? t('translation:edit_type', { type: t('vehicles:vehicle').toLowerCase() })
                : t('translation:add_new', { type: t('vehicles:vehicle').toLowerCase() })}
            </Typography>
            <Divider sx={{ margin: '16px 0' }} />
            <FormAddVehicle />
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
