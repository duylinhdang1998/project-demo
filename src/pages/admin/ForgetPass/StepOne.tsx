import { Box, Typography } from '@mui/material';
import InputAuth from 'components/InputAuth/InputAuth';
import MessageIcon from 'assets/images/message.svg';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { get } from 'lodash-es';
import { useStyles } from './styles';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { LoadingButton } from '@mui/lab';
import { useToastStyle } from 'theme/toastStyles';
import { toast } from 'react-toastify';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { forgotPasswordRequest } from 'services/Auth/Company/forgotPasswordRequest';
import { ServiceException } from 'services/utils/ServiceException';

export interface StepOneValues {
  email: string;
  session: string;
}

export interface StepOneProps {
  onNext: (values: StepOneValues) => void;
}

// Request forgot password
export const StepOne = ({ onNext }: StepOneProps) => {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['auth']);
  const classes = useStyles();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm<Pick<StepOneValues, 'email'>>();

  const onSubmit = async (values: Pick<StepOneValues, 'email'>) => {
    setIsLoading(true);
    try {
      const { data } = await forgotPasswordRequest({ email: values.email });
      onNext({
        email: values.email,
        session: data.session,
      });
    } catch (error) {
      toast(<ToastCustom type="error" text={t('auth:request_reset_password_error')} description={ServiceException.getMessageError(error)} />, {
        className: toastClass.toastError,
      });
    } finally {
      setIsLoading(false);
    }
    console.log(values);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <Box minWidth="400px" padding="0 16px">
      <Typography component="h2" fontWeight={400} fontSize="36px" mb="20px">
        {t('auth:find_account')}
      </Typography>
      <Typography component="p" fontSize={14} fontWeight={400} width="80%">
        {t('auth:sub_forgot_pass')}
      </Typography>

      <InputAuth
        control={control}
        nameInput={'email'}
        labelText={t('auth:email')}
        id="email"
        placeholder="Input your e-mail"
        iconStart={MessageIcon}
        type="email"
        error={!!errors['email']}
        messageErr={get(errors, 'email.message', '')}
      />
      <LoadingButton loading={isLoading} variant="contained" fullWidth className={classes.btnSubmit} onClick={handleSubmit(onSubmit)}>
        {t('auth:continue')}
      </LoadingButton>
      <LoadingButton variant="outlined" fullWidth className={classes.btnCancel} onClick={handleCancel}>
        {t('auth:cancel')}
      </LoadingButton>
    </Box>
  );
};
