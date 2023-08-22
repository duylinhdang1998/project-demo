import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import PaypalLogo from 'assets/images/paypal.svg';
import StripeLogo from 'assets/images/stripe.svg';
import { Control, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { AnyObject } from 'services/@types/SearchParams';
import { EnumPaymentGateway } from 'services/models/PaymentGateway';
import { useStyles } from '../../pages/agent/TicketSales/OrderDetailOnCreateOrder/styles';

export interface PaymentMethodProps<T extends AnyObject, Key extends keyof T> {
  control: Control<T>;
  errors: FieldErrors<T>;
  messages?: Record<keyof T, string>;
  label: Key;
  method: T[Key];
  onChange: (value: T[Key]) => void;
}

const PAYMENT_METHODS: Array<EnumPaymentGateway> = ['PAYPAL', 'STRIPE'];

export const PaymentMethod = <T extends AnyObject, K extends keyof T>({ errors, messages, label, method, onChange }: PaymentMethodProps<T, K>) => {
  const classes = useStyles();
  const { t } = useTranslation(['ticketSales']);
  const PAYMENT_LABELS: Record<EnumPaymentGateway, string> = {
    PAYPAL: t('account:Paypal'),
    STRIPE: t('account:Stripe'),
  };
  const PAYMENT_IMAGES: Record<EnumPaymentGateway, string> = {
    PAYPAL: PaypalLogo,
    STRIPE: StripeLogo,
  };

  const error = errors && label ? errors[label] : false;
  const messageErr = messages && label ? messages[label] : '';

  return (
    <>
      <Typography variant="h5">{t('ticketSales:payment_methods')}</Typography>
      {PAYMENT_METHODS.map(PAYMENT_METHOD => {
        return (
          <RadioGroup
            key={PAYMENT_METHOD}
            value={method}
            onChange={() => {
              onChange(PAYMENT_METHOD as any);
            }}
            name={label as string}
            className={error ? classes.fieldError : undefined}
          >
            <Stack direction="row" justifyContent="space-between" alignItems="center">
              <FormControlLabel
                value={PAYMENT_METHOD}
                control={<Radio />}
                label={PAYMENT_LABELS[PAYMENT_METHOD]}
                sx={{
                  '.MuiFormControlLabel-label': {
                    fontSize: '14px !important',
                  },
                }}
              />
              <img src={PAYMENT_IMAGES[PAYMENT_METHOD]} className={classes.img} />
            </Stack>
            {!!error && (
              <Typography component="p" className={classes.errorMessage} fontSize={12}>
                {messageErr}
              </Typography>
            )}
          </RadioGroup>
        );
      })}
    </>
  );
};
