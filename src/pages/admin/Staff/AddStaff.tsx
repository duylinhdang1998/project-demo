import { Box } from '@mui/material';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useLocation, useParams, useSearchParams } from 'react-router-dom';
import { selectStaffs } from 'store/staffs/selectors';
import { staffsActions } from 'store/staffs/staffsSlice';
import StepForm from './components/StepForm';
import { clamp, isNumber } from 'lodash-es';

export default function AddStaff() {
  const { t } = useTranslation(['translation, staff', 'message_error']);

  const { staffId } = useParams();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  const { statusGetStaff, staff } = useAppSelector(selectStaffs);
  const dispatch = useAppDispatch();

  const isEditAction = useMemo(() => {
    return !!staffId;
  }, [staffId]);

  useEffect(() => {
    if (isEditAction && staffId) {
      dispatch(staffsActions.getStaffRequest({ id: staffId }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditAction]);

  useEffect(() => {
    if (searchParams.has('step')) {
      searchParams.delete('step');
      setSearchParams(searchParams);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  if (statusGetStaff === 'loading') {
    return <LoadingScreen />;
  }

  if (isEditAction && (statusGetStaff === 'failure' || (!staff && statusGetStaff === 'success'))) {
    return <EmptyScreen description={t('message_error:STAFF_NOT_FOUND')} />;
  }

  const step = searchParams.get('step');
  const startStep = isNumber(step) ? clamp(step, 0, 2) : 0;
  return (
    <FadeIn>
      <LayoutDetail
        title={
          location.state?.isConsultSchedule
            ? t('translation:schedule')
            : isEditAction
            ? t('translation:edit_type', { type: t('staff:staff').toLowerCase() })
            : t('translation:create_new', { type: t('staff:staff').toLowerCase() })
        }
        subTitle={t('staff:staff')}
      >
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <StepForm isEditAction={isEditAction} startStep={step ? startStep : location.state?.isConsultSchedule ? 2 : 0} />
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
