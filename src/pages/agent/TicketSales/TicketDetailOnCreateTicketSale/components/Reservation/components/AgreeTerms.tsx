import { Checkbox, FormControlLabel, Typography } from '@mui/material';
import { useStyles } from 'components/FormVerticle/styles';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { TicketDetailFormValues } from '../../../@types/FormValues';

export interface AgreeTermsProps {
  label: 'accept_term';
  control: Control<TicketDetailFormValues>;
  errors: FieldErrors<TicketDetailFormValues>;
}

export const AgreeTerms = ({ control, errors, label }: AgreeTermsProps) => {
  const { t } = useTranslation(['ticketSales']);
  const formVerticleStyles = useStyles();

  return (
    <Controller
      control={control}
      name={label}
      rules={{ required: true }}
      render={({ field }) => {
        return (
          <>
            <FormControlLabel
              control={<Checkbox {...field} />}
              label={`${t('ticketSales:policy_privacy')}`}
              sx={{
                '.MuiFormControlLabel-label': {
                  fontSize: '14px !important',
                },
              }}
            />
            {!!errors['accept_term'] && (
              <Typography component="p" className={formVerticleStyles.error} fontSize={12}>
                {t('ticketSales:terms_agree_invalid')}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
};
