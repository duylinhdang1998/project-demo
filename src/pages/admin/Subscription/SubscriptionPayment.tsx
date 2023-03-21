import CardWhite from 'components/CardWhite/CardWhite';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { isEmpty } from 'lodash';
import { FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useLocation, useNavigate, useParams } from 'react-router';
import { SubscriptionType } from 'services/models/Subscription';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { PaymentMethod } from './@types/PaymentMethod';
import { PlanDuration } from './@types/PlanDuration';
import { PaymentButton } from './components/PaymentButton';
import { RadioPaymentMethod } from './components/RadioPaymentMethod';
import { RadioPlanDuration } from './components/RadioPlanDuration';
import { defaultPaymentMethod, planDurationsValue, defaultPlanDuration, paymentGateWayMapping } from './constants';

const SubscriptionPayment: FC = () => {
  const { t } = useTranslation(['account', 'translation']);

  const navigate = useNavigate();
  const { subscriptionType } = useParams();
  const location = useLocation();

  const [planDurationState, setPlanDurationState] = useState<PlanDuration>(() => {
    return location.state ?? defaultPlanDuration;
  });
  const [paymentMethodState, setPaymentMethodState] = useState<PaymentMethod>(defaultPaymentMethod);

  const { statusGetPlans, statusGetSubscriptions, plans, subscriptions } = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const isDisabledSubscription = useMemo(() => {
    return statusGetSubscriptions === 'success' && !subscriptions.find(subscription => subscription.subscriptionType === subscriptionType)?.active;
  }, [statusGetSubscriptions, subscriptionType, subscriptions]);

  useEffect(() => {
    if (isDisabledSubscription) {
      navigate('/account/subscription-package', { replace: true });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDisabledSubscription]);

  useEffect(() => {
    if (!subscriptionType) {
      navigate('/account/subscription-package', { replace: true });
    } else {
      dispatch(
        subscriptionsActions.getPlansRequest({
          subscriptionType: subscriptionType as SubscriptionType,
        }),
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [subscriptionType]);

  useEffect(() => {
    dispatch(
      subscriptionsActions.createSubscriptionOrderRequest({
        paymentGateWay: paymentGateWayMapping[paymentMethodState],
        period: planDurationsValue[planDurationState],
        subscriptionType: subscriptionType as SubscriptionType,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paymentMethodState, planDurationState]);

  if (statusGetPlans === 'idle' || statusGetPlans === 'loading') {
    return <LoadingScreen />;
  }

  if ((statusGetSubscriptions === 'success' && isEmpty(subscriptions)) || (statusGetPlans === 'success' && !plans.length)) {
    return <Navigate to="/404" />;
  }

  return (
    <FadeIn>
      <LayoutDetail title={t('account:subscription')}>
        <CardWhite title={t('account:subcribe_to_tbus_plan')}>
          <RadioPlanDuration planDurationState={planDurationState} setPlanDurationState={setPlanDurationState} />
          <RadioPaymentMethod
            paymentMethodState={paymentMethodState}
            setPaymentMethodState={setPaymentMethodState}
            PayPal={<PaymentButton variant="PayPal" />}
            Stripe={<PaymentButton variant="Stripe" />}
          />
        </CardWhite>
      </LayoutDetail>
    </FadeIn>
  );
};

export default SubscriptionPayment;
