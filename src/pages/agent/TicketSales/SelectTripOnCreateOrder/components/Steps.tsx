import { StepLabel, Stepper, Step, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SelectTripFormValues } from '../SelectTripOnCreateOrder';

interface StepProps {
  tripType: SelectTripFormValues['tripType'];
  step: 0 | 1 | 2;
}

export const Steps = ({ step, tripType }: StepProps) => {
  const { t } = useTranslation(['ticketSales']);

  if (tripType === 'MULTI_STOP') {
    const isStepOnepActiving = step === 0 || step === 1;
    const isStepTwopActiving = step === 1 || step === 2;
    return (
      <Stepper activeStep={step} sx={{ my: '24px', maxWidth: 500, mx: 'auto' }}>
        <Step>
          <StepLabel
            StepIconProps={{
              sx: {
                fill: isStepOnepActiving ? '#1AA6EE' : 'rgba(178, 186, 190, 1)',
                '& text': {
                  fill: '#fff !important',
                },
              },
            }}
            optional={
              <Typography variant="caption" color={isStepOnepActiving ? '#1AA6EE' : 'rgba(178, 186, 190, 1)'}>
                {t('ticketSales:departure_trip')}
              </Typography>
            }
          />
        </Step>
        <Step>
          <StepLabel
            StepIconProps={{
              sx: {
                fill: isStepTwopActiving ? '#1AA6EE' : 'rgba(178, 186, 190, 1)',
                '& text': {
                  fill: '#fff !important',
                },
              },
            }}
            optional={
              <Typography variant="caption" color={isStepTwopActiving ? '#1AA6EE' : 'rgba(178, 186, 190, 1)'}>
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
