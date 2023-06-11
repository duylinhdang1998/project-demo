import { LoadingButton } from '@mui/lab';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import PasswordIcon from 'assets/images/password.svg';
import InputAuth from 'components/InputAuth/InputAuth';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { get } from 'lodash-es';
import { Fragment, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { forgotPasswordSetNewPassword } from 'services/Auth/Company/forgotPasswordSetNewPassword';
import { ServiceException } from 'services/utils/ServiceException';
import { useStyles } from './styles';
import { FieldError } from 'components/InputAuth/FieldError';

export interface StepThreeValues {
  password: string;
  repassword: string;
}

interface StepThreeProps {
  session: string;
}
export const StepThree = ({ session }: StepThreeProps) => {
  const { t } = useTranslation('auth');
  const classes = useStyles();

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    getValues,
    watch,
  } = useForm<StepThreeValues>({
    defaultValues: { password: '', repassword: '' },
  });

  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const onSubmit = async (values: StepThreeValues) => {
    setIsLoading(true);
    try {
      await forgotPasswordSetNewPassword({ password: values.password, session });
      toast(<ToastCustom type="success" text={t('auth:reset_password_success')} />, {
        className: 'toast-success',
      });
      navigate('/login');
    } catch (error) {
      toast(<ToastCustom type="error" text={t('auth:reset_password_error')} description={ServiceException.getMessageError(error)} />, {
        className: 'toast-error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderResetPassInput = () => {
    return (
      <Fragment>
        <InputAuth
          control={control}
          nameInput={'password'}
          labelText={t('password')}
          id="password"
          placeholder="Input your password"
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.password}
          messageErr={
            isSubmitted ? <FieldError fieldMessage={errors.password?.message} fieldValue={watch('password')} /> : get(errors, 'password.message', '')
          }
        />
        <InputAuth
          control={control}
          nameInput={'repassword'}
          labelText={t('confirm_password')}
          id="repassword"
          placeholder="Input your password"
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.repassword}
          rules={{
            validate: {
              isEqual: v => getValues('password') === v || `${t('error_password')}`,
            },
          }}
          messageErr={get(errors, 'repassword.message', '')}
        />
        <LoadingButton loading={isLoading} variant="contained" fullWidth className={classes.btnSubmit} onClick={handleSubmit(onSubmit)}>
          {t('save_password')}
        </LoadingButton>
      </Fragment>
    );
  };

  return (
    <Box minWidth="400px" padding="0 16px">
      <Typography component="h2" fontWeight={400} fontSize="36px" mb="20px">
        {t('reset_pass')}
      </Typography>
      <Typography component="p" fontSize={14} fontWeight={400} width="80%">
        {t('reset_u_password')}
      </Typography>
      {renderResetPassInput()}
    </Box>
  );
};
