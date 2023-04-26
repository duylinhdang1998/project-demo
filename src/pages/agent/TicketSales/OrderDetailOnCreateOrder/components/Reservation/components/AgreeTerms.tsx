import { Box, Checkbox, FormControlLabel, Typography } from '@mui/material';
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
              label={
                <Box>
                  <span>
                    {t('ticketSales:term_create_ticket_sale')}{' '}
                    <a target="_blank" href="https://www.google.com/" className="text-primary font-semibold">
                      {t('ticketSales:term_of_service')}
                    </a>
                  </span>
                </Box>
              }
              sx={{
                alignItems: 'flex-start !important',
                '.MuiFormControlLabel-label': {
                  fontSize: '12px !important',
                  color: 'rgba(71, 84, 97, 1) !important',
                },
              }}
            />
            {!!errors['accept_term'] && (
              <Typography component="p" className={formVerticleStyles.error} fontSize={10}>
                {t('ticketSales:terms_agree_invalid')}
              </Typography>
            )}
          </>
        );
      }}
    />
  );
};
