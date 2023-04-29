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
import { CreateMultipleStopTrip } from 'services/Route/Company/createMultipleStopTrip';
import { CreateOneStopTrip } from 'services/Route/Company/createOneStopTrip';
import { UpdateTripRequest } from 'store/routes/actions/UpdateTrip';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import { dayjsToString } from 'utils/dayjsToString';
import { minutesToTimeString, timeStringToMinutes } from 'utils/timeStringNMinutes';
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
  iconRoot: {
    marginTop: '100%',
  },
  stepContainer: {
    padding: '0px !important',
    '& > span > span': {
      padding: '0px !important',
    },
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
    const data: Pick<UpdateTripRequest['data'] | CreateOneStopTrip, 'departurePoint' | 'departureTime' | 'tripType' | 'vehicle'> = {
      departurePoint: formValues.departurePoint,
      departureTime: dayjsToString(formValues.departureTime, 'HH:mm'),
      tripType: 'ONE_TRIP',
      vehicle: formValues.vehicle,
    };
    if (isEditAction && route) {
      dispatch(
        routesActions.updateTripRequest({
          data: {
            ...data,
            stopPoints: [
              {
                routePointId: formValues.routePointId as string,
                durationTime: timeStringToMinutes(formValues.arrivalDuration.format('HH:mm')),
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
          },
          routeCode: route.routeCode,
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            nextStep();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    } else {
      dispatch(
        routesActions.createOneStopTripRequest({
          data: {
            ...data,
            stopPoints: [
              {
                durationTime: timeStringToMinutes(formValues.arrivalDuration.format('HH:mm')),
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
          } as CreateOneStopTrip,
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('routers:new_trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            nextStep();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', { type: t('routers:new_trip').toLowerCase() })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    }
  };

  const handleSubmitStep1ForMultipleStopTrip = (formValues: StepOneValuesForMultipleStopTrip) => {
    const data: Pick<UpdateTripRequest['data'] | CreateMultipleStopTrip, 'departurePoint' | 'departureTime' | 'tripType' | 'vehicle'> = {
      departurePoint: formValues.departurePoint,
      departureTime: dayjsToString(formValues.departureTime, 'HH:mm'),
      tripType: 'MULTI_STOP',
      vehicle: formValues.vehicle,
    };
    if (isEditAction && route) {
      dispatch(
        routesActions.updateTripRequest({
          routeCode: route.routeCode,
          data: {
            ...data,
            stopPoints: formValues.routePoints.map(routePoint => ({
              durationTime: timeStringToMinutes(routePoint.duration.format('HH:mm')),
              stopPoint: routePoint.stop_point,
              routePointId: routePoint.routePointId as string,
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
          },
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            nextStep();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
          },
        }),
      );
    } else {
      dispatch(
        routesActions.createMultipleStopTripRequest({
          data: {
            ...data,
            stopPoints: formValues.routePoints.map(routePoint => ({
              durationTime: timeStringToMinutes(routePoint.duration.format('HH:mm')),
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
          } as CreateMultipleStopTrip,
          onSuccess() {
            toast(
              <ToastCustom
                type="success"
                text={t('translation:add_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            nextStep();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:add_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
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
            toast(
              <ToastCustom
                type="success"
                text={t('translation:edit_type_success', {
                  type: t('routers:trip').toLowerCase(),
                })}
              />,
              { className: 'toast-success' },
            );
            nextStep();
          },
          onFailure: message => {
            toast(
              <ToastCustom
                type="error"
                text={t('translation:edit_type_error', {
                  type: t('routers:trip').toLowerCase(),
                })}
                description={message}
              />,
              { className: 'toast-error' },
            );
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
              const value: RoutePointValues = {
                stop_point: routePointValue.stopPoint,
                duration: toDayjs({ value: minutesToTimeString(routePointValue.durationTime), format: 'HH:mm' }),
                ecoAdult: routePointValue.ECOPrices?.ADULT as number,
                ecoChildren: routePointValue.ECOPrices?.CHILD as number,
                ecoStudent: routePointValue.ECOPrices?.STUDENT as number,
                vipAdult: routePointValue.VIPPrices?.ADULT as number,
                vipChildren: routePointValue.VIPPrices?.CHILD as number,
                vipStudent: routePointValue.VIPPrices?.STUDENT as number,
                routePointId: routePointValue._id,
              };
              return result.concat(value);
            }
            return result;
          }, []),
        });
      } else {
        const routePointValue = route.routePoints[0];
        setStepOneValues({
          vehicle: route.vehicle,
          departurePoint: route.departurePoint,
          departureTime: toDayjs({ value: route.departureTime, format: 'HH:mm' }),
          arrivalPoint: routePointValue.stopPoint,
          arrivalDuration: toDayjs({ value: minutesToTimeString(routePointValue.durationTime), format: 'HH:mm' }),
          ecoAdult: routePointValue.ECOPrices?.ADULT as number,
          ecoChildren: routePointValue.ECOPrices?.CHILD as number,
          ecoStudent: routePointValue.ECOPrices?.STUDENT as number,
          vipAdult: routePointValue.VIPPrices?.ADULT as number,
          vipChildren: routePointValue.VIPPrices?.CHILD as number,
          vipStudent: routePointValue.VIPPrices?.STUDENT as number,
          routePointId: routePointValue._id,
        });
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
              const value: RoutePointValues = {
                stop_point: routePointValue.stopPoint,
                duration: toDayjs({ value: minutesToTimeString(routePointValue.durationTime), format: 'HH:mm' }),
                ecoAdult: routePointValue.ECOPrices?.ADULT as number,
                ecoChildren: routePointValue.ECOPrices?.CHILD as number,
                ecoStudent: routePointValue.ECOPrices?.STUDENT as number,
                vipAdult: routePointValue.VIPPrices?.ADULT as number,
                vipChildren: routePointValue.VIPPrices?.CHILD as number,
                vipStudent: routePointValue.VIPPrices?.STUDENT as number,
                routePointId: undefined,
              };
              return result.concat(value as RoutePointValues);
            }
            return result;
          }, []),
        });
      } else {
        const routePointValue = sourceToCopy.routePoints[0];
        setStepOneValues({
          vehicle: sourceToCopy.vehicle,
          departurePoint: sourceToCopy.departurePoint,
          departureTime: toDayjs({ value: sourceToCopy.departureTime, format: 'HH:mm' }),
          arrivalPoint: routePointValue.stopPoint,
          arrivalDuration: toDayjs({ value: minutesToTimeString(routePointValue.durationTime), format: 'HH:mm' }),
          ecoAdult: routePointValue.ECOPrices?.ADULT as number,
          ecoChildren: routePointValue.ECOPrices?.CHILD as number,
          ecoStudent: routePointValue.ECOPrices?.STUDENT as number,
          vipAdult: routePointValue.VIPPrices?.ADULT as number,
          vipChildren: routePointValue.VIPPrices?.CHILD as number,
          vipStudent: routePointValue.VIPPrices?.STUDENT as number,
          routePointId: undefined,
        });
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
      <Stepper activeStep={activeStep} sx={{ marginBottom: '28px', marginTop: '10px', maxWidth: '500px', mx: 'auto' }}>
        {steps.map((label, index) => {
          return (
            <Step key={label} classes={{ root: classes.stepContainer }}>
              <StepLabel
                StepIconProps={{
                  classes: {
                    text: classes.textStep,
                    root: classes.iconRoot,
                  },
                }}
                sx={{ flexDirection: 'column', color: '#fff' }}
                optional={
                  <Typography
                    variant="caption"
                    fontSize="12px"
                    textAlign="center"
                    color={activeStep === index ? '#1AA6EE' : 'rgba(174, 177, 197, 1)'}
                  >
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
