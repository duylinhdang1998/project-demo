import { Box, Divider, Step, StepLabel, Stepper, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useEffect, useState } from 'react';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectStaffs } from 'store/staffs/selectors';
import StepOne, { StepOneValues } from './FormStep/StepOne';
import StepThree from './FormStep/StepThree';
import StepTwo, { ALL_DAYS_OPTION_VALUE, StepTwoValues } from './FormStep/StepTwo';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { staffsActions } from 'store/staffs/staffsSlice';
import { toast } from 'react-toastify';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useToastStyle } from 'theme/toastStyles';
import { useTranslation } from 'react-i18next';
import { momentToNumber } from 'utils/momentToNumber';
import { anyToMoment } from 'utils/anyToMoment';
import { Staff } from 'services/models/Staff';
import { omit } from 'lodash';

const steps = ['Step 1', 'Step 2', 'Step 3'];

const useStyles = makeStyles(() => ({
  textStep: {
    fill: '#fff !important',
  },
}));

interface StepFormProps {
  isEditAction?: boolean;
}

export default function StepForm({ isEditAction }: StepFormProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [stepOneValues, setStepOneValues] = useState<StepOneValues | undefined>(undefined);
  const [stepTwoValues, setStepTwoValues] = useState<StepTwoValues | undefined>(undefined);

  const { t } = useTranslation(['translation']);
  const classes = useStyles();
  const toastClass = useToastStyle();

  const { statusCreateStaff, statusUpdateStaffInfo, statusUpdateDayActive, staff } = useAppSelector(selectStaffs);
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

  const handleSubmitStep1 = (formValues: StepOneValues) => {
    if (isEditAction && staff) {
      dispatch(
        staffsActions.updateStaffInfoRequest({
          staffId: staff._id,
          data: omit(formValues, ['role', 'email']),
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('staff:staff') })} />, {
              className: toastClass.toastSuccess,
            });
            nextStep();
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('staff:staff') })} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    } else {
      dispatch(
        staffsActions.createStaffRequest({
          data: formValues,
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:add_type_success', { type: t('staff:staff') })} />, {
              className: toastClass.toastSuccess,
            });
            nextStep();
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:add_type_error', { type: t('staff:staff') })} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    }
  };

  const handleSubmitStep2 = (formValues: StepTwoValues) => {
    if (staff) {
      dispatch(
        staffsActions.updateActiveDaysRequest({
          data: {
            presenceDay: formValues.days.filter(item => item !== ALL_DAYS_OPTION_VALUE) as Staff['presenceDay'],
            periodFrom: momentToNumber(formValues.fromDate),
            periodTo: momentToNumber(formValues.toDate),
            staffId: staff._id,
          },
          onSuccess() {
            toast(<ToastCustom type="success" text={t('translation:edit_type_success', { type: t('staff:staff') })} />, {
              className: toastClass.toastSuccess,
            });
            nextStep();
          },
          onFailure() {
            toast(<ToastCustom type="error" text={t('translation:edit_type_error', { type: t('staff:staff') })} />, {
              className: toastClass.toastError,
            });
          },
        }),
      );
    }
  };

  // Set state values từng step
  useEffect(() => {
    if (isEditAction && staff) {
      setStepOneValues({
        attach: staff.attach,
        email: staff.email,
        lastName: staff.lastName,
        firstName: staff.firstName,
        office: staff.office,
        phone: staff.phone,
        role: staff.role,
      });
      setStepTwoValues({
        days: staff.presenceDay,
        fromDate: anyToMoment({ value: staff.periodFrom }),
        toDate: anyToMoment({ value: staff.periodTo }),
      });
    }
  }, [isEditAction, staff]);

  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <StepOne
            isEdit={isEditAction}
            isLoading={statusCreateStaff === 'loading' || statusUpdateStaffInfo === 'loading'}
            values={stepOneValues}
            onCancel={values => {
              setStepOneValues(values);
              backStep();
            }}
            onNextStep={handleSubmitStep1}
          />
        );
      case 1:
        return (
          <StepTwo
            isLoading={!!staff && statusUpdateDayActive === 'loading'}
            values={stepTwoValues}
            onCancel={values => {
              setStepTwoValues(values);
              backStep();
            }}
            onNextStep={handleSubmitStep2}
          />
        );
      case 2:
        if (staff) {
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
