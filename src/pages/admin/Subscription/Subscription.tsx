import CheckIcon from '@mui/icons-material/Check';
import { Box, Grid, Stack, Typography } from '@mui/material';
import { Progress } from 'antd';
import 'antd/lib/progress/style/css';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import { FadeIn } from 'components/FadeIn/FadeIn';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { isEmpty } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { STATUS } from './constants';
import { getTotalRemainingDays } from './utils/getTotalRemainingDays';
import { getTotalTrialDays } from './utils/getTotalTrialDays';
import { getCheckoutNotification, setCheckoutNotification } from './utils/handleCheckoutNotification';

export default function Subscription() {
  const { t } = useTranslation(['account', 'translation']);

  const { statusGetCurrentSubscription, statusGetSubscriptions, currentSubscription, subscriptions } = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

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
    if (statusGetCurrentSubscription === 'success' && getCheckoutNotification()) {
      setCheckoutNotification(true);
      if (location.search.includes(STATUS.success)) {
        toast(<ToastCustom type="success" text={t('account:upgrade_subscription_success')} />, {
          className: 'toast-success',
        });
      }
      if (location.search.includes(STATUS.cancelled)) {
        toast(<ToastCustom type="error" text={t('account:upgrade_subscription_cancelled')} />, {
          className: 'toast-error',
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusGetCurrentSubscription]);

  if (statusGetCurrentSubscription === 'loading' || statusGetSubscriptions === 'loading') {
    return <LoadingScreen />;
  }

  if ((statusGetCurrentSubscription === 'success' && !currentSubscription) || (statusGetSubscriptions === 'success' && isEmpty(subscriptions))) {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <Box>
        <HeaderLayout activeSideBarHeader={t('account:subscription')} />
        <Box p="24px">
          <CardWhite title={t('account:my_subscription')}>
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
