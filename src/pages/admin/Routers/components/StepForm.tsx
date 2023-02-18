import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route } from 'services/models/Route';
import { selectRoutes } from 'store/routes/selectors';
import { departureOptions } from '../constants';
import StepOne, { StepOneValuesForTripOneway } from './FormStep/StepOne';
import StepOneMultiple, { StepOneValuesForTripMultiway } from './FormStep/StepOneMultiple';
import StepThree, { StepThreeValues } from './FormStep/StepThree';
import StepTwo, { StepTwoValues } from './FormStep/StepTwo';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const useStyles = makeStyles(() => ({
  textStep: {
    fill: '#fff !important',
  },
}));

interface StepFormProps {
  isMulti?: boolean;
  isEditAction?: boolean;
  route?: Route;
}

export default function StepForm({ isMulti, route, isEditAction }: StepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState<StepOneValuesForTripOneway | StepOneValuesForTripMultiway | undefined>(undefined);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues | undefined>(undefined);
  const [stepThreeValues, setStepThreeValues] = useState<StepThreeValues | undefined>(undefined);

  const classes = useStyles();

  const { statusCreateRoute, queueUpdateRoute } = useAppSelector(selectRoutes);

  const nextStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const backStep = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  useEffect(() => {
    if (isEditAction && route) {
      // FIXME: Set state values từng step
      if (isMulti) {
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: departureOptions.find(option => option.value === route.departurePoint),
          departureTime: route.departureTime,
          stops: route.stopPoints.map(stopPointValue => ({
            stop_point: departureOptions.find(option => option.value === stopPointValue.stopPoint),
            stop_time: stopPointValue.durationTime,
            ecoAdult: stopPointValue.ECOPrices.ADULT,
            ecoChildren: stopPointValue.ECOPrices.CHILD,
            ecoStudent: stopPointValue.ECOPrices.STUDENT,
            vipAdult: stopPointValue.VIPPrices.ADULT,
            vipChildren: stopPointValue.VIPPrices.CHILD,
            vipStudent: stopPointValue.VIPPrices.STUDENT,
          })),
        } as StepOneValuesForTripMultiway);
      } else {
        const stopPointValue = route.stopPoints[0];
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: departureOptions.find(option => option.value === route.departurePoint),
          departureTime: route.departureTime,
          arrivalPoint: departureOptions.find(option => option.value === stopPointValue.stopPoint),
          arrivalTime: stopPointValue.durationTime,
          ecoAdult: stopPointValue.ECOPrices.ADULT,
          ecoChildren: stopPointValue.ECOPrices.CHILD,
          ecoStudent: stopPointValue.ECOPrices.STUDENT,
          vipAdult: stopPointValue.VIPPrices.ADULT,
          vipChildren: stopPointValue.VIPPrices.CHILD,
          vipStudent: stopPointValue.VIPPrices.STUDENT,
        } as StepOneValuesForTripOneway);
      }
      setStepTwoValues({
        days: route.dayActives,
        fromDate: route.startPeriod,
        toDate: route.endPeriod,
      });
      setStepThreeValues({});
    }
  }, [isEditAction, isMulti, route]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        if (isMulti) {
          return (
            <StepOneMultiple
              values={stepOneValues as Exclude<typeof stepOneValues, StepOneValuesForTripOneway>}
              onCancel={values => {
                setStepOneValues(values);
                backStep();
              }}
              onNextStep={values => {
                setStepOneValues(values);
                nextStep();
              }}
            />
          );
        }
        return (
          <StepOne
            values={stepOneValues as Exclude<typeof stepOneValues, StepOneValuesForTripMultiway>}
            onCancel={values => {
              setStepOneValues(values);
              backStep();
            }}
            onNextStep={values => {
              setStepOneValues(values);
              nextStep();
            }}
          />
        );
      case 1:
        return (
          <StepTwo
            values={stepTwoValues}
            onCancel={values => {
              setStepTwoValues(values);
              backStep();
            }}
            onNextStep={values => {
              setStepTwoValues(values);
              nextStep();
            }}
          />
        );
      case 2:
        return (
          <StepThree
            values={stepThreeValues}
            onCancel={values => {
              setStepThreeValues(values);
              backStep();
            }}
            isLoading={statusCreateRoute === 'loading' || (route && queueUpdateRoute.includes(route?._id))}
            onSave={values => {
              console.log('SAVE', {
                stepOneValues,
                stepTwoValues,
                stepThreeValues: values,
              });
            }}
          />
        );
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
