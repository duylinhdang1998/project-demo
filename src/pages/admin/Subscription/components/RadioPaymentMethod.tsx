import { FormControlLabel, Radio, RadioGroup, RadioGroupProps } from '@mui/material';
import { Fragment, ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { PaymentMethod } from '../@types/PaymentMethod';
import { defaultPaymentMethod, paymentMethods } from '../constants';

interface RadioPaymentMethodProps {
  PayPal: ReactNode;
  Stripe: ReactNode;
  paymentMethodState: PaymentMethod;
  setPaymentMethodState: (paymentMethod: PaymentMethod) => void;
}

export const RadioPaymentMethod = ({ paymentMethodState, setPaymentMethodState, ...props }: RadioPaymentMethodProps) => {
  const { t } = useTranslation(['account']);

  const handleChangeMethod: RadioGroupProps['onChange'] = (_, newValue) => {
    setPaymentMethodState(newValue as PaymentMethod);
  };

  const renderItem = (paymentMethod: PaymentMethod) => {
    return (
      <Fragment key={paymentMethod}>
        <FormControlLabel value={paymentMethod} control={<Radio />} label={t(`account:${paymentMethod}`)} sx={{ width: '140px' }} />
        {paymentMethod === paymentMethodState && props[paymentMethodState]}
      </Fragment>
    );
  };

  return (
    <RadioGroup defaultValue={defaultPaymentMethod} name="method" onChange={handleChangeMethod} sx={{ marginTop: '24px' }}>
      {paymentMethods.map(renderItem)}
    </RadioGroup>
  );
};
