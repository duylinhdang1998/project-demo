import CardWhite from 'components/CardWhite/CardWhite';
import { FadeIn } from 'components/FadeIn/FadeIn';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import LayoutDetail from 'layout/LayoutDetail';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router';
import { SubscriptionType } from 'services/models/Subscription';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { PaymentMethod } from './@types/PaymentMethod';
import { PlanDuration } from './@types/PlanDuration';
import { CreditCard } from './components/CreditCard';
import { Paypal } from './components/Paypal';
import { RadioPaymentMethod } from './components/RadioPaymentMethod';
import { RadioPlanDuration } from './components/RadioPlanDuration';
import { defaultPaymentMethod, planDurationsValue } from './constants';

// FIXME: Có những phương thức thanh toán nào?
const SubscriptionPayment: FC = () => {
  const { t } = useTranslation(['account', 'translation']);

  const [planDurationState, setPlanDurationState] = useState<PlanDuration>('monthly');
  const [paymentMethodState, setPaymentMethodState] = useState<PaymentMethod>(defaultPaymentMethod);

  const { statusGetPlans, plans } = useAppSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { subscriptionType } = useParams();

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
        paymentGateWay: 'PAYPAL',
        period: planDurationsValue[planDurationState],
        subscriptionType: subscriptionType as SubscriptionType,
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [planDurationState]);

  if (statusGetPlans === 'idle' || statusGetPlans === 'loading') {
    return <LoadingScreen />;
  }

  if (statusGetPlans === 'success' && !plans.length) {
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
            Stripe={<></>}
            CreditCard={<CreditCard />}
            PayPal={<Paypal />}
          />
        </CardWhite>
      </LayoutDetail>
    </FadeIn>
  );
};

export default SubscriptionPayment;
