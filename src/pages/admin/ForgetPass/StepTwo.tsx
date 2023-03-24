import { LoadingButton } from '@mui/lab';
import { Box, Typography } from '@mui/material';
import PasswordIcon from 'assets/images/password.svg';
import InputAuth from 'components/InputAuth/InputAuth';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { get } from 'lodash-es';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPasswordRequest } from 'services/Auth/Company/forgotPasswordRequest';
import { forgotPasswordVerifyOtp } from 'services/Auth/Company/forgotPasswordVerifyOtp';
import { useToastStyle } from 'theme/toastStyles';
import { useStyles } from './styles';

export interface StepTwoValues {
  session: string;
}

export interface StepTwoProps {
  onNext: (values: StepTwoValues) => void;
  session: string;
  email: string;
}

// Verify otp
export const StepTwo = ({ onNext, session, email }: StepTwoProps) => {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['auth']);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
    setValue,
  } = useForm<{ otp: string; session: string }>();

  const onSubmit = async (values: { otp: string; session: string }) => {
    setIsLoading(true);
    try {
      const { data } = await forgotPasswordVerifyOtp({
        session: values.session,
        otp: values.otp,
      });
      onNext({ session: data.session });
    } catch {
      toast(<ToastCustom type="error" text={t('auth:verify_otp_error')} />, {
        className: toastClass.toastError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setIsLoading(true);
    try {
      const { data } = await forgotPasswordRequest({ email });
      setValue('session', data.session);
      toast(<ToastCustom type="success" text={t('auth:resend_otp_success')} />, {
        className: toastClass.toastSuccess,
      });
    } catch {
      toast(<ToastCustom type="error" text={t('auth:resend_otp_error')} />, {
        className: toastClass.toastError,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    setValue('session', session);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session]);

  return (
    <Box minWidth="400px" padding="0 16px">
      <Typography component="h2" fontWeight={400} fontSize="36px" mb="20px">
        {t('auth:verify_otp')}
      </Typography>
      <Typography component="p" fontSize={14} fontWeight={400} width="80%" className={classes.resendOtp}>
        {t('auth:verify_otp_description')}
      </Typography>

      <InputAuth
        control={control}
        nameInput={'otp'}
        labelText={t('auth:otp')}
        id="otp"
        placeholder="Input your otp"
        iconStart={PasswordIcon}
        error={!!errors['otp']}
        messageErr={get(errors, 'otp.message', '')}
      />
      <Typography onClick={handleResendOTP} component="a" fontSize={14} fontWeight={400} width="80%">
        {t('resend_otp')}
      </Typography>
      <LoadingButton loading={isLoading} variant="contained" fullWidth className={classes.btnSubmit} onClick={handleSubmit(onSubmit)}>
        {t('auth:continue')}
      </LoadingButton>
      <LoadingButton variant="outlined" fullWidth className={classes.btnCancel} onClick={handleCancel}>
        {t('auth:cancel')}
      </LoadingButton>
    </Box>
  );
};
