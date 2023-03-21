import { Box, Grid, Stack, Typography } from '@mui/material';
import { get, isEmpty } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { PlanDuration } from './@types/PlanDuration';
import SubscriptionItem from './components/SubscriptionItem';
import { planDurations } from './constants';
import { getPlanDurationsFromSubscription } from './utils/getPlanDurationsFromSubscription';
import { Navigate } from 'react-router-dom';

export default function SubscriptionPackage() {
  const { t } = useTranslation(['account', 'translation']);

  const { statusGetSubscriptions, statusGetCurrentSubscription, subscriptions, currentSubscription } = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const [planDurationState, setPlanDurationState] = useState<PlanDuration>('monthly');

  useEffect(() => {
    if (isEmpty(subscriptions)) {
      dispatch(subscriptionsActions.getSubscriptionsRequest({}));
    }
    if (!currentSubscription) {
      dispatch(subscriptionsActions.getCurrentSubscriptionRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderTab = () => {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my="24px">
        {planDurations.map(planDuration => {
          const isActive = planDurationState === planDuration;
          return (
            <Button
              key={planDuration}
              onClick={() => setPlanDurationState(planDuration)}
              backgroundButton={isActive ? '#1AA6EE' : 'F7F7F7'}
              sx={{ padding: '10px 14px', color: isActive ? undefined : '#45485E' }}
            >
              {t(`account:${planDuration}_payment`)}
            </Button>
          );
        })}
      </Stack>
    );
  };

  const renderPackages = () => {
    return (
      <Grid container spacing="24px">
        {subscriptions.map(subscription => {
          const price = get(getPlanDurationsFromSubscription(subscription), planDurationState).price;
          return (
            <Grid item xs={12} md={4} key={subscription.name}>
              <SubscriptionItem
                name={subscription.name}
                planDuration={planDurationState}
                subscriptionFeatures={subscription.subscriptionFeatures}
                subscriptionType={subscription.subscriptionType}
                currency={getAppCurrencySymbol()}
                price={price}
                popular={subscription.populateChoice}
                disabled={!subscription.active}
                isRegistered={subscription.subscriptionType === currentSubscription?.subscriptionType}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  if (statusGetSubscriptions === 'loading' || statusGetCurrentSubscription === 'loading') {
    return <LoadingScreen />;
  }

  if ((statusGetCurrentSubscription === 'success' && !currentSubscription) || (statusGetSubscriptions === 'success' && isEmpty(subscriptions))) {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <LayoutDetail title={t('account:subscription')}>
        <Box width="100%" display="flex" justifyContent="center">
          <Box bgcolor="#fff" borderRadius="4px" width={{ xs: '100%', md: '80%' }} padding="24px">
            <Typography fontSize={20} fontWeight={700} textAlign="center">
              {t('account:get_more_out_tbus')}
            </Typography>
            {renderTab()}
            {renderPackages()}
          </Box>
        </Box>
      </LayoutDetail>
    </FadeIn>
  );
}
