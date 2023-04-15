import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { ALL_DAYS_OPTION_VALUE } from 'components/SelectDaysOfWeek/SelectDaysOfWeek';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'react-toastify';
import { Route } from 'services/models/Route';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import { dayjsToString } from 'utils/dayjsToString';
import { toDayjs } from 'utils/toDayjs';
import StepOne, { StepOneValuesForOneStopTrip } from './FormStep/StepOne';
import StepOneMultiple, { RoutePointValues, StepOneValuesForMultipleStopTrip } from './FormStep/StepOneMultiple';
import StepThree from './FormStep/StepThree';
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
  sourceToCopy?: Route;
}

export default function StepForm({ isMulti, isEditAction, sourceToCopy }: StepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState<StepOneValuesForOneStopTrip | StepOneValuesForMultipleStopTrip | undefined>(undefined);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues | undefined>(undefined);

  const { t } = useTranslation(['translation']);
  const classes = useStyles();

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

  const handleSubmitStep1ForOneStopTrip = (formValues: StepOneValuesForOneStopTrip) => {
    if (isEditAction) {
      // FIXME: Chưa có api update nên chưa lắp chức năng "Edit"
    } else {
      dispatch(
        routesActions.createOneStopTripRequest({
          data: {
            departurePoint: formValues.departurePoint,
            departureTime: dayjsToString(formValues.departureTime, 'HH:mm'),
            tripType: 'ONE_TRIP',
            stopPoints: [
              {
                durationTime: Number(formValues.arrivalDuration),
                stopPoint: formValues.arrivalPoint,
                ECOPrices: [
                  { passengerType: 'ADULT', price: Number(formValues.ecoAdult) },
                  { passengerType: 'CHILD', price: Number(formValues.ecoChildren) },
                  { passengerType: 'STUDENT', price: Number(formValues.ecoStudent) },
                ],
                VIPPrices: [
                  { passengerType: 'ADULT', price: Number(formValues.vipAdult) },
                  { passengerType: 'CHILD', price: Number(formValues.vipChildren) },
                  { passengerType: 'STUDENT', price: Number(formValues.vipStudent) },
                ],
              },
            ],
            vehicle: formValues.vehicle,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:add_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            nextStep();
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:add_type_error', { type: t('routers:route') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const handleSubmitStep1ForMultipleStopTrip = (formValues: StepOneValuesForMultipleStopTrip) => {
    if (isEditAction) {
      // FIXME: Chưa có api update nên chưa lắp chức năng "Edit"
    } else {
      dispatch(
        routesActions.createMultipleStopTripRequest({
          data: {
            departurePoint: formValues.departurePoint,
            departureTime: dayjsToString(formValues.departureTime, 'HH:mm'),
            tripType: 'MULTI_STOP',
            stopPoints: formValues.routePoints.map(routePoint => ({
              durationTime: Number(routePoint.duration),
              stopPoint: routePoint.stop_point,
              ECOPrices: [
                { passengerType: 'ADULT', price: Number(routePoint.ecoAdult) },
                { passengerType: 'CHILD', price: Number(routePoint.ecoChildren) },
                { passengerType: 'STUDENT', price: Number(routePoint.ecoStudent) },
              ],
              VIPPrices: [
                { passengerType: 'ADULT', price: Number(routePoint.vipAdult) },
                { passengerType: 'CHILD', price: Number(routePoint.vipChildren) },
                { passengerType: 'STUDENT', price: Number(routePoint.vipStudent) },
              ],
            })),
            vehicle: formValues.vehicle,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:add_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            nextStep();
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:add_type_error', { type: t('routers:route') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  const handleSubmitStep2 = (formValues: StepTwoValues) => {
    if (route) {
      dispatch(
        routesActions.updateActiveDaysRequest({
          data: {
            routeCode: route?.routeCode,
            dayActives: formValues.days.filter(item => item !== ALL_DAYS_OPTION_VALUE) as Route['dayActives'],
            endPeriod: dayjsToNumber(formValues.toDate),
            startPeriod: dayjsToNumber(formValues.fromDate),
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('routers:route') })} />, {
              className: 'toast-success',
            });
            nextStep();
          },
          onFailure: message => {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('routers:route') })} description={message} />, {
              className: 'toast-error',
            });
          },
        }),
      );
    }
  };

  // Set state values từng step
  useEffect(() => {
    if (isEditAction && route) {
      if (isMulti) {
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: route.departurePoint,
          departureTime: toDayjs({ value: route.departureTime, format: 'HH:mm' }),
          routePoints: route.routePoints.reduce<StepOneValuesForMultipleStopTrip['routePoints']>((result, routePointValue) => {
            if (routePointValue.routeType === 'MAIN_ROUTE') {
              const value = {
                stop_point: routePointValue.stopPoint,
                duration: Number(routePointValue.durationTime),
                ecoAdult: routePointValue.ECOPrices?.ADULT,
                ecoChildren: routePointValue.ECOPrices?.CHILD,
                ecoStudent: routePointValue.ECOPrices?.STUDENT,
                vipAdult: routePointValue.VIPPrices?.ADULT,
                vipChildren: routePointValue.VIPPrices?.CHILD,
                vipStudent: routePointValue.VIPPrices?.STUDENT,
              };
              return result.concat(value as RoutePointValues);
            }
            return result;
          }, []),
        } as StepOneValuesForMultipleStopTrip);
      } else {
        const routePointValue = route.routePoints[0];
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: route.departurePoint,
          departureTime: toDayjs({ value: route.departureTime, format: 'HH:mm' }),
          arrivalPoint: routePointValue.stopPoint,
          arrivalDuration: routePointValue.durationTime,
          ecoAdult: routePointValue.ECOPrices?.ADULT,
          ecoChildren: routePointValue.ECOPrices?.CHILD,
          ecoStudent: routePointValue.ECOPrices?.STUDENT,
          vipAdult: routePointValue.VIPPrices?.ADULT,
          vipChildren: routePointValue.VIPPrices?.CHILD,
          vipStudent: routePointValue.VIPPrices?.STUDENT,
        } as StepOneValuesForOneStopTrip);
      }
      setStepTwoValues({
        days: route.dayActives,
        fromDate: toDayjs({ value: route.startPeriod }),
        toDate: toDayjs({ value: route.endPeriod }),
      });
    }
  }, [isEditAction, isMulti, route]);

  useEffect(() => {
    if (sourceToCopy) {
      if (isMulti) {
        setStepOneValues({
          vehicle: sourceToCopy.vehicle,
          departurePoint: sourceToCopy.departurePoint,
          departureTime: toDayjs({ value: sourceToCopy.departureTime, format: 'HH:mm' }),
          routePoints: sourceToCopy.routePoints.reduce<StepOneValuesForMultipleStopTrip['routePoints']>((result, routePointValue) => {
            if (routePointValue.routeType === 'MAIN_ROUTE') {
              const value = {
                stop_point: routePointValue.stopPoint,
                duration: Number(routePointValue.durationTime),
                ecoAdult: routePointValue.ECOPrices?.ADULT,
                ecoChildren: routePointValue.ECOPrices?.CHILD,
                ecoStudent: routePointValue.ECOPrices?.STUDENT,
                vipAdult: routePointValue.VIPPrices?.ADULT,
                vipChildren: routePointValue.VIPPrices?.CHILD,
                vipStudent: routePointValue.VIPPrices?.STUDENT,
              };
              return result.concat(value as RoutePointValues);
            }
            return result;
          }, []),
        } as StepOneValuesForMultipleStopTrip);
      } else {
        const routePointValue = sourceToCopy.routePoints[0];
        setStepOneValues({
          vehicle: sourceToCopy.vehicle,
          departurePoint: sourceToCopy.departurePoint,
          departureTime: toDayjs({ value: sourceToCopy.departureTime, format: 'HH:mm' }),
          arrivalPoint: routePointValue.stopPoint,
          arrivalDuration: routePointValue.durationTime,
          ecoAdult: routePointValue.ECOPrices?.ADULT,
          ecoChildren: routePointValue.ECOPrices?.CHILD,
          ecoStudent: routePointValue.ECOPrices?.STUDENT,
          vipAdult: routePointValue.VIPPrices?.ADULT,
          vipChildren: routePointValue.VIPPrices?.CHILD,
          vipStudent: routePointValue.VIPPrices?.STUDENT,
        } as StepOneValuesForOneStopTrip);
      }
      setStepTwoValues({
        days: sourceToCopy.dayActives,
        fromDate: toDayjs({ value: sourceToCopy.startPeriod }),
        toDate: toDayjs({ value: sourceToCopy.endPeriod }),
      });
    }
  }, [isMulti, sourceToCopy]);

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
