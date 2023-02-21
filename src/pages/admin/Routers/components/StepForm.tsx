import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectRoutes } from 'store/routes/selectors';
import { departureOptions } from '../constants';
import StepOne, { StepOneValuesForOneStopTrip } from './FormStep/StepOne';
import StepOneMultiple, { StepOneValuesForMultipleStopTrip } from './FormStep/StepOneMultiple';
import StepThree from './FormStep/StepThree';
import StepTwo, { ALL_DAYS_OPTION_VALUE, StepTwoValues } from './FormStep/StepTwo';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { routesActions } from 'store/routes/routesSlice';
import { toast } from 'react-toastify';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useToastStyle } from 'theme/toastStyles';
import { useTranslation } from 'react-i18next';
import { momentToNumber } from 'utils/momentToNumber';
import { momentToString } from 'utils/momentToString';
import { anyToMoment } from 'utils/anyToMoment';
import { Route } from 'services/models/Route';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const useStyles = makeStyles(() => ({
  textStep: {
    fill: '#fff !important',
  },
}));

interface StepFormProps {
  isMulti?: boolean;
  isEditAction?: boolean;
}

export default function StepForm({ isMulti, isEditAction }: StepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState<StepOneValuesForOneStopTrip | StepOneValuesForMultipleStopTrip | undefined>(undefined);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues | undefined>(undefined);

  const { t } = useTranslation(['translation']);
  const classes = useStyles();
  const toastClass = useToastStyle();

  const { statusCreateRoute, statusUpdateRoute, statusUpdateDayActive, route } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const nextStep = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const backStep = () => {
    if (activeStep === 0) {
      return;
    }
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  // FIXME: Chưa có api update nên chưa lắp chức năng "Edit"
  const handleSubmitStep1ForOneStopTrip = (formValues: StepOneValuesForOneStopTrip) => {
    dispatch(
      routesActions.createOneStopTripRequest({
        data: {
          departurePoint: formValues.departurePoint.value as string,
          departureTime: momentToString(formValues.departureTime, 'HH:mm'),
          routeType: 'ONE_TRIP',
          stopPoints: [
            {
              durationTime: Number(formValues.arrivalDuration),
              stopPoint: formValues.arrivalPoint.value as string,
              ECOPrices: [
                { passengerType: 'ADULT', price: Number(formValues.ecoAdult) },
                { passengerType: 'CHILD', price: Number(formValues.ecoChildren) },
                { passengerType: 'STUDENT', price: Number(formValues.ecoStudent) },
              ],
              VIPPrices: [
                { passengerType: 'ADULT', price: formValues.vipAdult },
                { passengerType: 'CHILD', price: formValues.vipChildren },
                { passengerType: 'STUDENT', price: formValues.vipStudent },
              ],
            },
          ],
          vehicle: formValues.vehicle,
        },
        onSuccess() {
          toast(<ToastCustom type="success" text={t('routers:route_created')} />, {
            className: toastClass.toastSuccess,
          });
          nextStep();
        },
        onFailure() {
          toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
            className: toastClass.toastError,
          });
        },
      }),
    );
  };

  // FIXME: Chưa có api update nên chưa lắp chức năng "Edit"
  const handleSubmitStep1ForMultipleStopTrip = (formValues: StepOneValuesForMultipleStopTrip) => {
    dispatch(
      routesActions.createMultipleStopTripRequest({
        data: {
          departurePoint: formValues.departurePoint.value as string,
          departureTime: momentToString(formValues.departureTime, 'HH:mm'),
          routeType: 'MULTI_STOP',
          stopPoints: formValues.stops.map(stop => ({
            durationTime: Number(stop.duration),
            stopPoint: stop.stop_point.value as string,
            ECOPrices: [
              { passengerType: 'ADULT', price: stop.ecoAdult },
              { passengerType: 'CHILD', price: stop.ecoChildren },
              { passengerType: 'STUDENT', price: stop.ecoStudent },
            ],
            VIPPrices: [
              { passengerType: 'ADULT', price: stop.vipAdult },
              { passengerType: 'CHILD', price: stop.vipChildren },
              { passengerType: 'STUDENT', price: stop.vipStudent },
            ],
          })),
          vehicle: formValues.vehicle,
        },
        onSuccess() {
          toast(<ToastCustom type="success" text={t('routers:route_created')} />, {
            className: toastClass.toastSuccess,
          });
          nextStep();
        },
        onFailure() {
          toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
            className: toastClass.toastError,
          });
        },
      }),
    );
  };

  const handleSubmitStep2 = (formValues: StepTwoValues) => {
    if (route) {
      dispatch(
        routesActions.updateActiveDaysRequest({
          data: {
            routeCode: route?.routeCode,
            dayActives: formValues.days.filter(item => item !== ALL_DAYS_OPTION_VALUE) as Route['dayActives'],
            endPeriod: momentToNumber(formValues.toDate),
            startPeriod: momentToNumber(formValues.fromDate),
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('routers:route_updated')} />, {
              className: toastClass.toastSuccess,
            });
            nextStep();
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    }
  };

  // Set state values từng step
  useEffect(() => {
    if (route) {
      if (isMulti) {
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: departureOptions.find(option => option.value === route.departurePoint),
          departureTime: anyToMoment({ value: route.departureTime, format: 'HH:mm' }),
          stops: route.stopPoints.map(stopPointValue => ({
            stop_point: departureOptions.find(option => option.value === stopPointValue.stopPoint),
            duration: Number(stopPointValue.durationTime),
            ecoAdult: stopPointValue.ECOPrices.ADULT,
            ecoChildren: stopPointValue.ECOPrices.CHILD,
            ecoStudent: stopPointValue.ECOPrices.STUDENT,
            vipAdult: stopPointValue.VIPPrices.ADULT,
            vipChildren: stopPointValue.VIPPrices.CHILD,
            vipStudent: stopPointValue.VIPPrices.STUDENT,
          })),
        } as StepOneValuesForMultipleStopTrip);
      } else {
        const stopPointValue = route.stopPoints[0];
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: departureOptions.find(option => option.value === route.departurePoint),
          departureTime: anyToMoment({ value: route.departureTime, format: 'HH:mm' }),
          arrivalPoint: departureOptions.find(option => option.value === stopPointValue.stopPoint),
          arrivalDuration: stopPointValue.durationTime,
          ecoAdult: stopPointValue.ECOPrices.ADULT,
          ecoChildren: stopPointValue.ECOPrices.CHILD,
          ecoStudent: stopPointValue.ECOPrices.STUDENT,
          vipAdult: stopPointValue.VIPPrices.ADULT,
          vipChildren: stopPointValue.VIPPrices.CHILD,
          vipStudent: stopPointValue.VIPPrices.STUDENT,
        } as StepOneValuesForOneStopTrip);
      }
      setStepTwoValues({
        days: route.dayActives,
        fromDate: anyToMoment({ value: route.startPeriod }),
        toDate: anyToMoment({ value: route.endPeriod }),
      });
    }
  }, [isMulti, route]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        if (isMulti) {
          return (
            <StepOneMultiple
              isEdit={isEditAction}
              isLoading={statusCreateRoute === 'loading' || statusUpdateRoute === 'loading'}
              values={stepOneValues as Exclude<typeof stepOneValues, StepOneValuesForOneStopTrip>}
              onCancel={values => {
                setStepOneValues(values);
                backStep();
              }}
              onNextStep={handleSubmitStep1ForMultipleStopTrip}
            />
          );
        }
        return (
          <StepOne
            isEdit={isEditAction}
            isLoading={statusCreateRoute === 'loading' || statusUpdateRoute === 'loading'}
            values={stepOneValues as Exclude<typeof stepOneValues, StepOneValuesForMultipleStopTrip>}
            onCancel={values => {
              setStepOneValues(values);
              backStep();
            }}
            onNextStep={handleSubmitStep1ForOneStopTrip}
          />
        );
      case 1:
        return (
          <StepTwo
            isLoading={!!route && statusUpdateDayActive === 'loading'}
            values={stepTwoValues}
            onCancel={values => {
              setStepTwoValues(values);
              backStep();
            }}
            onNextStep={handleSubmitStep2}
          />
        );
      case 2:
        if (route) {
          return <StepThree isEdit={isEditAction} onCancel={backStep} />;
        }
        return null;
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
