import { FormControlLabel, Radio, RadioGroup, Stack, Typography } from '@mui/material';
import { useStyles } from '../styles';
import StripeLogo from 'assets/images/stripe.svg';
import PaypalLogo from 'assets/images/paypal.svg';
import { useTranslation } from 'react-i18next';
import { Control, FieldErrors } from 'react-hook-form';
import { TicketDetailFormValues } from '../TicketDetailOnCreateTicketSale';

export interface PaymentMethodProps {
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
  messages: Record<string, string>;
  label: 'method';
  method: TicketDetailFormValues['method'];
  onChange: (value: TicketDetailFormValues['method']) => void;
}

const PAYMENT_METHODS: Array<TicketDetailFormValues['method']> = ['PAYPAL', 'STRIPE'];

export const PaymentMethod = ({ errors, messages, label, method, onChange }: PaymentMethodProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['ticketSales']);

  const PAYMENT_LABELS: Record<TicketDetailFormValues['method'], string> = {
    PAYPAL: t('account:Paypal'),
    STRIPE: t('account:Stripe'),
  };
  const PAYMENT_IMAGES: Record<TicketDetailFormValues['method'], string> = {
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
            value={method}
            onChange={() => {
              onChange(PAYMENT_METHOD);
            }}
            name={label}
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
