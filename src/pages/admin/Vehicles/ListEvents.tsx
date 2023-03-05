import { useEffect } from 'react';
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
import TableEvents from './components/TableEvents';
import { selectAuth } from 'store/auth/selectors';

export default function ListEvents() {
  const { t } = useTranslation(['vehicles', 'translation']);

  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetVehicleEvents } = useAppSelector(selectVehicleEvents);
  const { vehicle, statusGetVehicle } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';

  useEffect(() => {
    if (vehicleId) {
      dispatch(
        vehicleEventsActions.getVehicleEventsRequest({
          page: 0,
          searcher: {},
          sorter: {},
          vehicleId,
        }),
      );
      dispatch(
        vehiclesActions.getVehicleRequest({
          id: vehicleId,
        }),
      );
    } else {
      navigate('/404');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (statusGetVehicleEvents === 'loading' || statusGetVehicle === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetVehicle === 'success' && !vehicle) {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <LayoutDetail
        variant="withTable"
        subTitle={t('vehicles:vehicles')}
        title={t('vehicles:event_lists')}
        addNewItemButtonProps={{
          onClick: () => {
            navigate(isAgent ? `/agent/vehicles/${vehicleId}/add-new-event` : `/admin/vehicles/${vehicleId}/add-new-event`);
          },
          children: t('translation:create_new', { type: t('vehicles:event') }),
        }}
      >
        <TableEvents />
      </LayoutDetail>
    </FadeIn>
  );
}
