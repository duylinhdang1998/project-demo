/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Divider, InputLabel, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { FadeIn } from 'components/FadeIn/FadeIn';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Theme } from '@mui/material';
import Select from 'react-select';
import { useForm } from 'react-hook-form';
import { CurrencyEnum } from 'models/Currency';
import { customStyles } from 'components/FilterTicket/customStyles';
import Button from 'components/Button/Button';
import { useSetCurrencyConfig } from 'services/System/config';
import { useDispatch, useSelector } from 'react-redux';
import { profileActions } from 'store/profile/profileSlice';
import { selectProfile } from 'store/profile/selectors';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200] + '!important',
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
    '&.MuiFormControlLabel-label': {
      fontSize: '14px !important',
    },
  },
  select: {
    border: '1px solid #F7F7F7 !important',
    borderRadius: '4px',
    backgroundColor: '#fff',
    height: '40px',
    position: 'relative',
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
  inputError: {
    border: `1px solid ${theme.palette.error.main} !important`,
  },
}));

const currencyOptions = [
  { value: CurrencyEnum.EUR, label: CurrencyEnum.EUR },
  { value: CurrencyEnum.FRF, label: CurrencyEnum.FRF },
  { value: CurrencyEnum.USD, label: CurrencyEnum.USD },
  { value: CurrencyEnum.XAF, label: CurrencyEnum.XAF },
];

export default function CurrencySetting() {
  const classes = useStyles();
  const { t } = useTranslation(['account', 'translation']);
  const [selected, setSelected] = useState<any>(undefined);
  const {
    formState: { errors },
    setValue,
    reset,
    handleSubmit,
    watch,
  } = useForm<{
    currency: string;
  }>();
  const dispatch = useDispatch();
  const { profile } = useSelector(selectProfile);

  const { run, loading } = useSetCurrencyConfig({
    onSuccess: data => {
      if (data.code === 0) {
        const currencyData = {
          currency: watch('currency'),
          symbol: data.data.symbol,
        };
        dispatch(profileActions.setCurrencySetting(currencyData));
      }
    },
  });

  const onSubmit = (values: any) => {
    run({ currency: values.currency });
  };

  useEffect(() => {
    if (!!profile?.currency) {
      reset({
        currency: profile.currency.currency,
      });
      const currencySelected = currencyOptions.filter(it => it.value === profile.currency.currency);
      setSelected(currencySelected);
    }
  }, [profile]);

  return (
    <FadeIn>
      <Box>
        <HeaderLayout activeSideBarHeader={t('account:currency_setting')} />
        <Box display="flex" justifyContent="center" alignItems="center" mt="24px">
          <Box bgcolor="white" padding="24px" borderRadius="4px" minWidth="440px">
            <Typography fontWeight={700} color="#0C1132">
              {t('currency_setting')}
            </Typography>
            <Divider style={{ margin: '24px 0' }} />
            <Box>
              <InputLabel className={classes.label}>{t('currency')}</InputLabel>
              <Select
                isSearchable
                className={!!errors.currency ? classes.inputError : ''}
                onChange={(selected: any) => {
                  setValue('currency', selected.value);
                  setSelected(selected);
                }}
                options={currencyOptions}
                value={selected}
                styles={customStyles}
                placeholder={t('currency')}
              />
              {!!errors.currency && (
                <Typography component="p" className={classes.error} fontSize={12}>
                  {t('translation:error_required', { name: t('currency') })}
                </Typography>
              )}
            </Box>
            <Box display="flex" alignItems="center" justifyContent="flex-end" mt="20px">
              <Button sx={{ height: '40px', padding: '12px 24px' }} backgroundButton="#1AA6EE" loading={loading} onClick={handleSubmit(onSubmit)}>
                {t('translation:save')}
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </FadeIn>
  );
}
