import { Box, FormControlLabel, Radio, RadioGroup, RadioGroupProps, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import clxs from 'classnames';
import Button from 'components/Button/Button';
import CardWhite from 'components/CardWhite/CardWhite';
import CreditCard from 'components/CreditCard/CreditCard';
import { useAppDispatch } from 'hooks/useAppDispatch';
import LayoutDetail from 'layout/LayoutDetail';
import { get } from 'lodash';
import { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { SubscriptionType } from 'services/models/Subscription';
import { selectSubscriptions } from 'store/subscriptions/selectors';
import { subscriptionsActions } from 'store/subscriptions/subscriptionsSlice';
import { PlanDuration } from './@types/PlanDuration';
import { planDurations } from './constants';
import { getPlanDurationsFromSubscriptionPlans } from './utils/getPlanDurationsFromSubscriptionPlans';

const useStyles = makeStyles(() => ({
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    border: '0.5px solid #D7DADC',
    borderRadius: 4,
    width: '100%',
    padding: '24px',
  },
  label: {
    display: 'block',
    width: '100%',
  },
  selected: {
    border: '2px solid #1AA6EE',
  },
}));

// FIXME: Có những phương thức thanh toán nào?
const SubscriptionPayment: FC = () => {
  const { t } = useTranslation(['account', 'translation']);
  const classes = useStyles();
  const [planDurationState, setPlanDurationState] = useState<PlanDuration>('monthly');
  const [method, setMethod] = useState('credit');
  const [creaditVal, setCreditVal] = useState({
    cvc: '',
    expiry: '',
    focus: '',
    name: '',
    number: '',
  });

  const { statusGetPlans, plans } = useSelector(selectSubscriptions);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { subscriptionType } = useParams();

  const handleChangeMethod = (event: React.ChangeEvent<HTMLInputElement>, newValue: string) => {
    setMethod(newValue);
  };

  const renderPaypalValue = () => {
    return (
      <Box my="10px">
        <Typography variant="body2" fontWeight={700}>
          Click the PayPal button to log in.
        </Typography>
        <Typography variant="body2">You'll be prompted for your PayPal account email and password through a secure PayPal login form.</Typography>
        <Button backgroundButton="#0A89CA" sx={{ fontStyle: 'italic', padding: '10px 18px' }}>
          Paypal
        </Button>
      </Box>
    );
  };

  const handleInputFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setCreditVal((prev) => ({
      ...prev,
      focus: e.target.name,
    }));
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCreditVal((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  const renderCreditValue = () => {
    return (
      <Box my="10px" display={method !== 'credit' ? 'none' : 'block'}>
        <CreditCard />
      </Box>
    );
  };

  const handleChangePlanDuration: RadioGroupProps['onChange'] = (_, value) => {
    setPlanDurationState(value as PlanDuration);
  };

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
  }, [subscriptionType]);

  useEffect(() => {
    if (statusGetPlans === 'success' && !plans.length) {
      navigate('/notfound', { replace: true });
    }
  }, [statusGetPlans]);

  // FIXME: Loading screen
  if (statusGetPlans === 'loading') {
    return <h1>Loading...</h1>;
  }

  // FIXME: Empty screen
  if (!plans.length) {
    return <h1>WTF</h1>;
  }

  return (
    <LayoutDetail title={t('account:subcription')}>
      <CardWhite title={t('subcribe_to_tbus_plan')}>
        <RadioGroup row name="subscription" value={planDurationState} onChange={handleChangePlanDuration}>
          <Stack direction="row" alignItems="center" spacing={3} width="100%">
            {planDurations.map((planDuration) => {
              const label = planDuration === 'monthly' ? t('monthly_payment') : t('yearly_payment');
              const price = get(getPlanDurationsFromSubscriptionPlans(plans), planDuration).price;
              return (
                <label htmlFor={planDuration} className={classes.label}>
                  <Box className={clxs(classes.item, { [classes.selected]: planDurationState === planDuration })}>
                    <Box>
                      <Typography fontSize={14} color="#858C93">
                        {label}
                      </Typography>
                      <Typography fontSize="18px" fontWeight={700} color="#0C1132">
                        {/* FIXME: Thiếu currency symbol */}
                        {price}/{t(`translation:${planDuration}`)}
                      </Typography>
                    </Box>
                    <Radio value={planDuration} id={planDuration} />
                  </Box>
                </label>
              );
            })}
          </Stack>
        </RadioGroup>
        <RadioGroup defaultValue="credit" name="method" onChange={handleChangeMethod} sx={{ marginTop: '24px' }}>
          <FormControlLabel value="paypal" control={<Radio />} label="Paypal" sx={{ width: '140px' }} />
          {method === 'paypal' && renderPaypalValue()}
          <FormControlLabel value="credit" control={<Radio />} label="Credit Card" sx={{ width: '140px' }} />
          {renderCreditValue()}
          <FormControlLabel value="stripe" control={<Radio />} label="Stripe" sx={{ width: '140px' }} />
        </RadioGroup>
      </CardWhite>
    </LayoutDetail>
  );
};

export default SubscriptionPayment;
