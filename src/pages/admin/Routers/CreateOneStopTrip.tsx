import { Box } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams } from 'react-router-dom';
import { Route } from 'services/models/Route';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import StepForm from './components/StepForm';

export default function CreateOneStopTrip() {
  const { t } = useTranslation(['routers', 'translation', 'message_error']);

  const { routeCode } = useParams();
  const location = useLocation();

  const { statusGetRoute, route } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const isEditAction = useMemo(() => {
    return !!routeCode;
  }, [routeCode]);
  const sourceToCopy = location.state as Route | undefined;

  useEffect(() => {
    if (isEditAction && routeCode) {
      dispatch(routesActions.getRouteRequest({ routeCode }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  if (statusGetRoute === 'loading') {
    return <LoadingScreen />;
  }

  if (isEditAction && (statusGetRoute === 'failure' || (!route && statusGetRoute === 'success'))) {
    return <EmptyScreen description={t('message_error:ROUTE_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        title={t(isEditAction ? 'translation:edit_type' : 'translation:create_new', { type: t('one_way_trip').toLowerCase() })}
        subTitle={t('routers:routers')}
      >
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <StepForm isEditAction={isEditAction} sourceToCopy={sourceToCopy} />
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
