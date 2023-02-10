import { Box, Grid, Stack, Typography } from '@mui/material';
import Button from 'components/Button/Button';
import { useAppDispatch } from 'hooks/useAppDispatch';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { PlanDuration } from './@types/PlanDuration';
import SubscriptionItem from './components/SubscriptionItem';
import { planDurations } from './constants';
import { getPlanDurationsFromSubscription } from './utils/getPlanDurationsFromSubscription';



export default function SubscriptionPackage() {
  const { t } = useTranslation(['account', 'translation']);
  const { statusGetSubscriptions, subscriptions } = useSelector(selectSubscriptions);
  const dispatch = useAppDispatch();
  const [planDurationState, setPlanDurationState] = useState<PlanDuration>('monthly');

  useEffect(() => {
    dispatch(subscriptionsActions.getSubscriptionsRequest({}));
  }, []);

  const renderTab = () => {
    return (
      <Stack direction="row" alignItems="center" justifyContent="center" spacing={1} my="24px">
        {planDurations.map((planDuration) => {
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
        {subscriptions.map((subscription, index) => {
          const price = get(getPlanDurationsFromSubscription(subscription), planDurationState).price;
          return (
            <Grid item xs={12} md={4} key={subscription.name}>
              {/* FIXME: "popular" lấy đâu ra? */}
              <SubscriptionItem
                name={subscription.name}
                planDuration={planDurationState}
                subscriptionFeatures={subscription.subscriptionFeatures}
                subscriptionType={subscription.subscriptionType}
                currency={subscription.currency}
                price={price}
                popular={index === 1}
              />
            </Grid>
          );
        })}
      </Grid>
    );
  };

  // FIXME: Loading screen
  if (statusGetSubscriptions === 'loading') {
    return <h1>Loading...</h1>;
  }

  return (
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
  );
}
