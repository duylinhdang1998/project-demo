import { LoadingButton } from '@mui/lab';
import { Button, Checkbox, FormControlLabel, Grid } from '@mui/material';
import { Box } from '@mui/system';
import logoTbus from 'assets/images/logo-blue.png';
import MessageIcon from 'assets/images/message.svg';
import PasswordIcon from 'assets/images/password.svg';
import InputAuth from 'components/InputAuth/InputAuth';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { get } from 'lodash-es';
import Highlighter from 'react-highlight-words';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions } from 'store/auth/authSlice';
import { selectAuth } from 'store/auth/selectors';
import { useStyles } from './styles';
import TextWithLink from '../../components/TextWithLink/TextWithLink';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { useEffect } from 'react';

interface Values {
  email: string;
  password: string;
  remember_me: boolean;
}

function LoginPage() {
  const { statusLogin } = useAppSelector(selectAuth);
  const { t } = useTranslation('auth');
  const classes = useStyles();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    reset,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      email: '',
      password: '',
      remember_me: false,
    },
    mode: 'all',
  });

  useEffect(() => {
    const credentials = localStorage.getItem('credentials');
    if (credentials) {
      const { email, password } = JSON.parse(credentials);

      reset({
        email,
        password,
        remember_me: true,
      });
    }
  }, []);

  const handleNavigate = () => {
    navigate('/sign-up');
  };

  const onSubmit = (values: Values) => {
    const credentials = {
      email: values.email,
      password: values.password,
    };
    dispatch(
      authActions.loginRequest({
        password: values.password,
        email: values.email,
        onSuccess: () => {
          if (values.remember_me) {
            localStorage.setItem('credentials', JSON.stringify(credentials));
          } else {
            localStorage.removeItem('credentials');
          }
        },
        onFailure: () => {
          toast(<ToastCustom type="error" text={t('login_failure')} description={t('login_failure_description')} />, {
            className: 'toast-error',
          });
        },
      }),
    );
  };

  const handleForgotPage = () => {
    navigate('/forgot-password');
  };

  return (
    <form onSubmitCapture={handleSubmit(onSubmit)}>
      <Box className={classes.root}>
        <Box display={{ mobile: 'block', desktop: 'none' }} textAlign="center" mb="50px">
          <img src={logoTbus} alt="logo" width="50%" />
        </Box>
        <Grid className={classes.textWrap}>
          <Grid item xs={12} md={8}>
            <Highlighter
              textToHighlight={t('title_login')}
              highlightClassName={classes.highlightText}
              searchWords={['Tbus']}
              autoEscape={true}
              className={classes.title}
            />
          </Grid>
        </Grid>
        <InputAuth
          control={control}
          nameInput={'email'}
          labelText={t('email')}
          id="email"
          placeholder={t('input_email')}
          iconStart={MessageIcon}
          type="email"
          error={!!errors.email}
          messageErr={get(errors, 'email.message', '')}
        />
        <InputAuth
          control={control}
          nameInput={'password'}
          labelText={t('password')}
          id="password"
          placeholder={t('input_password')}
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.password}
          messageErr={get(errors, 'password.message', '')}
        />
        <div className={classes.flexButton}>
          <Controller
            control={control}
            name="remember_me"
            render={({ field }) => {
              return (
                <FormControlLabel
                  {...field}
                  className={classes.rememberMe}
                  control={<Checkbox {...field} checked={!!field.value} disableRipple checkedIcon={<CheckBoxIcon sx={{ color: '#19A6EE' }} />} />}
                  label={t('remember_me')}
                />
              );
            }}
          />
          <Button className={classes.forgotBtn} onClick={handleForgotPage}>
            {t('forgotPassword')}
          </Button>
        </div>
        <LoadingButton variant="contained" fullWidth className={classes.btnSubmit} type="submit" loading={statusLogin === 'loading'}>
          {t('login')}
        </LoadingButton>
        <TextWithLink text={t('notHaveAccount')} highlight={t('register_link')} onClick={handleNavigate} />
      </Box>
    </form>
  );
}

export default LoginPage;
