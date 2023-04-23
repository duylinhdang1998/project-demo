import { StepLabel, Stepper, Step, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SelectTripFormValues } from '../SelectTripOnCreateTicketSale';

interface StepProps {
  tripType: SelectTripFormValues['tripType'];
  step: 1 | 2;
}

export const Steps = ({ step, tripType }: StepProps) => {
  const { t } = useTranslation(['ticketSales']);

  if (tripType === 'MULTI_STOP') {
    return (
      <Stepper activeStep={step} sx={{ my: '24px', maxWidth: 500, mx: 'auto' }}>
        <Step>
          <StepLabel
            StepIconProps={{
              sx: {
                fill: step === 1 ? '#1AA6EE' : 'rgba(178, 186, 190, 1)',
                '& text': {
                  fill: '#fff !important',
                },
              },
            }}
            optional={
              <Typography variant="caption" color={step === 1 ? '#1AA6EE' : 'rgba(178, 186, 190, 1)'}>
                {t('ticketSales:departure_trip')}
              </Typography>
            }
          />
        </Step>
        <Step>
          <StepLabel
            StepIconProps={{
              sx: {
                fill: step === 2 ? '#1AA6EE' : 'rgba(178, 186, 190, 1)',
                '& text': {
                  fill: '#fff !important',
                },
              },
            }}
            optional={
              <Typography variant="caption" color={step === 2 ? '#1AA6EE' : 'rgba(178, 186, 190, 1)'}>
                {t('ticketSales:return_trip')}
              </Typography>
            }
          />
        </Step>
      </Stepper>
    );
  }
  return null;
};
