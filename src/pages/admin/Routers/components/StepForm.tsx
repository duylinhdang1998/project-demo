import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useState } from 'react';
import StepOne from './FormStep/StepOne';
import StepOneMultiple from './FormStep/StepOneMultiple';
import StepThird from './FormStep/StepThird';
import StepTwo from './FormStep/StepTwo';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const useStyles = makeStyles(() => ({
  textStep: {
    fill: '#fff !important',
  },
}));

interface StepFormProps {
  isMulti?: boolean;
}

export default function StepForm({ isMulti }: StepFormProps) {
  const [activeStep, setActiveStep] = useState(0);

  const classes = useStyles();

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };
  const handleCancel = () => {
    if (activeStep === 0) {
      return;
    }
    handleBack();
  };

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        if (isMulti) {
          return <StepOneMultiple onCancel={handleCancel} onNextStep={handleNext} />;
        }
        return <StepOne onCancel={handleCancel} onNextStep={handleNext} />;
      case 1:
        return <StepTwo onCancel={handleCancel} onNextStep={handleNext} />;
      case 2:
        return <StepThird onCancel={handleCancel} onNextStep={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <Box>
      <Stepper activeStep={activeStep} sx={{ my: '24px', maxWidth: '500px', mx: 'auto' }}>
        {steps.map((label, index) => {
          return (
            <Step key={label}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    text: classes.textStep,
                  },
                }}
                sx={{ flexDirection: 'column', color: '#fff' }}
                optional={
                  <Typography variant="caption" color={activeStep === index ? '#1AA6EE' : 'inherit'}>
                    {label}
                  </Typography>
                }
              ></StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Divider />
      {renderStepContent()}
    </Box>
  );
}
