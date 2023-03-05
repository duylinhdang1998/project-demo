import { Box } from '@mui/material';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useParams } from 'react-router-dom';
import { selectRoutes } from 'store/routes/selectors';
import StepForm from './components/StepForm';

export default function CreateOneStopTrip() {
  const { t } = useTranslation(['routers', 'translation']);

  const { routerId } = useParams();

  const { statusGetRoute, route } = useAppSelector(selectRoutes);
  // const dispatch = useAppDispatch();

  const isEditAction = useMemo(() => {
    return !!routerId;
  }, [routerId]);

  useEffect(() => {
    if (isEditAction && routerId) {
      // FIXME: API lỗi tạm thời comment
      // dispatch(routesActions.getRouteRequest({ id: routerId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  if (statusGetRoute === 'loading') {
    return <LoadingScreen />;
  }

  if (isEditAction && !route && statusGetRoute === 'success') {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        title={t(isEditAction ? 'translation:edit_type' : 'translation:create_new', { type: t('one_way_trip').toLowerCase() })}
        subTitle={t('routers:routers')}
      >
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <StepForm isEditAction={isEditAction} />
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
