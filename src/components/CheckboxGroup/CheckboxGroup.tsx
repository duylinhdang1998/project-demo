import { Checkbox, CheckboxProps, FormControlLabel, Stack, Typography } from '@mui/material';
import { equals } from 'ramda';
import { useEffect, useState } from 'react';
import { useStyles } from './styles';
import { MethodPaymentResponse, useLoginPaymentGateway } from '../../services/Company/paymentMethods';
import { useFormContext } from 'react-hook-form';
import { get, includes } from 'lodash-es';
import { CheckCircleOutlined } from '@mui/icons-material';
import { Box } from '@mui/system';
import { styled } from '@mui/material/styles';
import Button from '../Button/Button';
import { useTranslation } from 'react-i18next';

export type OptionValue = any;

export interface Option {
  key?: string;
  value?: OptionValue;
  label?: string;
  [key: string]: any;
}

export interface CheckboxGroupProps {
  options: Option[];
  onChange: (values: OptionValue[]) => void;
  onSubmit: (values: any) => void;
  values: OptionValue[];
  horizontal?: boolean;
  dataMethod?: MethodPaymentResponse;
  equalsFunc: (input: OptionValue, optionValue: OptionValue) => boolean; // Deep populate là k có
}

const CustomButton = styled(Button)({
  backgroundColor: '#263B80',
  '&:hover': {
    backgroundColor: '#263B80',
    boxShadow: 'none',
  },
  marginTop: '5px',
});

export const CheckboxGroup = ({ options, values, onChange, equalsFunc, horizontal = true, dataMethod, onSubmit }: CheckboxGroupProps) => {
  const classes = useStyles();
  const { t } = useTranslation(['account', 'translation']);

  const { watch, handleSubmit } = useFormContext();

  const methodValueWatch = watch('methods');

  const { loading: loading2, runAsync: getUrlGateWay } = useLoginPaymentGateway();

  const [valuesState, setValuesState] = useState<OptionValue[]>([]);

  const handleChange =
    (value: OptionValue): CheckboxProps['onChange'] =>
    e => {
      if (e.target.checked) {
        const nextState = valuesState.concat(value);
        setValuesState(nextState);
        onChange?.(nextState);
      } else {
        const nextState = valuesState.filter(item => !equalsFunc(item, value));
        setValuesState(nextState);
        onChange?.(nextState);
      }
    };

  const handleLogin = (gate: string) => async () => {
    await handleSubmit(onSubmit)();
    if (gate === 'PAYPAL') {
      const response = await getUrlGateWay('v1.0/company/payment/paypal/connect');
      if (response) {
        window.open(response, '_self');
      }
      return;
    }
    const response = await getUrlGateWay('/v1.0/company/payment/stripe-links', {
      refreshUrl: window.location.href,
      returnUrl: window.location.href,
    });
    window.open(get(response, 'url', ''), '_blank');
  };

  useEffect(() => {
    if (!equals(values, valuesState)) {
      setValuesState(values);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <Stack direction={horizontal ? 'row' : 'column'} gap="8px" flexWrap="wrap">
      {options.map(option => {
        if (!option.value) {
          return null;
        }
        const paymentMethod = dataMethod?.data?.find(item => item.paymentGateWay === option.value);
        const isChecked = valuesState.find(item => equalsFunc(item, option.value));
        return (
          <FormControlLabel
            key={option.key}
            className={classes.label}
            // @ts-ignore
            control={<Checkbox onChange={handleChange(option.value)} checked={!!isChecked} />}
            label={
              <div className="flex">
                <p style={{ borderBottom: '1px dotted black' }}>
                  <strong>{option.label}</strong>
                </p>
                <Box mb="10px">
                  {includes(methodValueWatch, option.value) && (
                    <>
                      <Typography variant="body2">{t('subtext_2', { method: option.value?.toLowerCase() })}</Typography>
                      <CustomButton
                        sx={{
                          backgroundColor: option.value === 'PAYPAL' ? '#263B80' : '#635BFF',
                        }}
                        variant="contained"
                        loading={loading2}
                        onClick={handleLogin(option.value ?? '')}
                        startIcon={paymentMethod?.registered ? <CheckCircleOutlined /> : null}
                      >
                        {option.value === 'PAYPAL' ? t('login_paypal') : t('login_stripe')}
                      </CustomButton>
                      {!paymentMethod?.registered && (
                        <Typography color="#B58205" mt="4px" fontSize={12}>
                          {t('not_registered_payment')}
                        </Typography>
                      )}
                    </>
                  )}
                </Box>
              </div>
            }
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '14px !important',
                fontWeight: '400 !important',
              },
            }}
          />
        );
      })}
    </Stack>
  );
};
