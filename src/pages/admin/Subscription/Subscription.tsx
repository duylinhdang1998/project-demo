import CheckIcon from '@mui/icons-material/Check';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Progress } from 'antd';
import 'antd/lib/progress/style/css';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import { EmptyScreen } from 'components/EmptyScreen/EmptyScreen';
import { FadeIn } from 'components/FadeIn/FadeIn';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { isEmpty } from 'lodash-es';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { updateURLSearchParamsOfBrowserWithoutNavigation } from 'utils/updateURLSearchParamsOfBrowserWithoutNavigation';
import { STATUS } from './constants';
import { getTotalRemainingDays } from './utils/getTotalRemainingDays';
import { getTotalTrialDays } from './utils/getTotalTrialDays';
import { getCheckoutNotification, setCheckoutNotification, setHiddenTrialNotification } from './utils/handleCheckoutNotification';

export default function Subscription() {
  const { t } = useTranslation(['account', 'translation', 'message_error']);

  const { statusGetCurrentSubscription, statusGetSubscriptions, currentSubscription, subscriptions } = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isShowUpgradeNotification = useMemo(() => {
    return statusGetCurrentSubscription === 'success' && getCheckoutNotification();
  }, [statusGetCurrentSubscription]);

  const subscriptionFeatures = useMemo(() => {
    if (currentSubscription && !isEmpty(subscriptions)) {
      return subscriptions.find(subscription => subscription.subscriptionType === currentSubscription.subscriptionType)?.subscriptionFeatures ?? [];
    }
    return [];
  }, [currentSubscription, subscriptions]);

  const totalTrialDays = useMemo(() => {
    if (currentSubscription) {
      return getTotalTrialDays(currentSubscription);
    }
    return 1;
  }, [currentSubscription]);

  const totalRemainingTrialDays = useMemo(() => {
    if (currentSubscription) {
      return getTotalRemainingDays(currentSubscription);
    }
    return 0;
  }, [currentSubscription]);

  const handleClick = () => {
    navigate('/account/subscription-package');
  };

  useEffect(() => {
    if (isEmpty(subscriptions)) {
      dispatch(subscriptionsActions.getSubscriptionsRequest({}));
    }
    if (!currentSubscription) {
      dispatch(subscriptionsActions.getCurrentSubscriptionRequest({}));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isShowUpgradeNotification) {
      setCheckoutNotification(true);
      setHiddenTrialNotification(true);
      if (location.search.includes(STATUS.success)) {
        toast(
          <ToastCustom
            type="success"
            text={t('account:upgrade_subscription_success')}
            description={t('account:upgrade_subscription_success_description')}
          />,
          {
            className: 'toast-success',
          },
        );
        updateURLSearchParamsOfBrowserWithoutNavigation(new URLSearchParams());
      }
      if (location.search.includes(STATUS.cancelled)) {
        toast(<ToastCustom type="error" text={t('account:upgrade_subscription_cancelled')} />, {
          className: 'toast-error',
        });
        updateURLSearchParamsOfBrowserWithoutNavigation(new URLSearchParams());
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetCurrentSubscription]);

  if (statusGetCurrentSubscription === 'loading' || statusGetSubscriptions === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetSubscriptions === 'failure' || (statusGetSubscriptions === 'success' && isEmpty(subscriptions))) {
    return <EmptyScreen description={t('message_error:SUBSCRIPTION_NOT_FOUND')} />;
  }

  if (statusGetCurrentSubscription === 'failure' || (statusGetCurrentSubscription === 'success' && !currentSubscription)) {
    return <EmptyScreen description={t('message_error:SUBSCRIPTION_NOT_FOUND')} />;
  }

  return (
    <FadeIn>
      <Box>
        <HeaderLayout activeSideBarHeader={t('account:subscription')} />
        <Box p="24px">
          <CardWhite title={t('account:my_subscription')}>
            {isShowUpgradeNotification && (
              <Box marginBottom="8px">
                <Typography fontWeight={700} fontSize={14} color="#FF2727">
                  {t('account:upgrade_subscription_success')}
                  <Typography fontSize={13} color="#FF2727">
                    {t('account:upgrade_subscription_success_description')}
                  </Typography>
                </Typography>
              </Box>
            )}
            <Typography fontWeight={700} color="#0C1132">
              {t(`account:${currentSubscription?.subscriptionType}`)}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
                {subscriptionFeatures.map(i => (
                  <Stack direction="row" alignItems="center" spacing={3} key={i.type} my="10px">
                    <CheckIcon sx={{ color: '#33CC7F', fontSize: '12px' }} />
                    <Typography variant="body2">{i.name}</Typography>
                  </Stack>
                ))}
              </Grid>
              <Grid item xs={12} md={4}>
                <Progress
                  type="circle"
                  percent={totalRemainingTrialDays / totalTrialDays}
                  format={() => (
                    <Box>
                      <Typography fontSize={12} color="#858C93">
                        {t('translation:left')}
                      </Typography>
                      <Typography fontSize={18} color="#0c1132" fontWeight={700}>
                        {totalRemainingTrialDays} {t('translation:days')}
                      </Typography>
                    </Box>
                  )}
                  width={120}
                  strokeColor="#33CC7F"
                />
              </Grid>
            </Grid>
            {currentSubscription?.subscriptionType === 'TRIAL' && (
              <Typography sx={{ margin: '16px 0' }} variant="body2">
                {t('account:after_trial_end')}
              </Typography>
            )}
            <Button
              sx={{ margin: '24px 0', alignSelf: 'flex-end', padding: '10px 14px', float: 'right' }}
              backgroundButton="#1AA6EE"
              onClick={handleClick}
            >
              {t('translation:upgrade_now')}
            </Button>
          </CardWhite>
        </Box>
      </Box>
    </FadeIn>
  );
}
