import logoTbus from 'assets/images/logo-blue.png';
import MessageIcon from 'assets/images/message.svg';
import PasswordIcon from 'assets/images/password.svg';
import { LoadingButton } from '@mui/lab';
import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import InputAuth from 'components/InputAuth/InputAuth';
import TextWithLink from 'components/TextWithLink/TextWithLink';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { get } from 'lodash';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { authActions } from 'store/auth/authSlice';
import { selectAuth } from 'store/auth/selectors';
import { useStyles } from './styles';
import { useToastStyle } from 'theme/toastStyles';
import ToastCustom from 'components/ToastCustom/ToastCustom';

interface Values {
  email: string;
  password: string;
}

function LoginPage() {
  const { statusLogin } = useAppSelector(selectAuth);
  const { t } = useTranslation('auth');
  const classes = useStyles();
  const toastClass = useToastStyle();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      email: 'alibaba.transport@gmail.com',
      password: '12345678',
    },
    mode: 'all',
  });

  const handleNavigate = () => {
    navigate('/sign-up');
  };

  const onSubmit = (values: Values) => {
    dispatch(
      authActions.loginRequest({
        password: values.password,
        email: values.email,
        onSuccess: () => {},
        onFailure: () => {
          toast(<ToastCustom type="error" text={t('login_failure')} />, {
            className: toastClass.toastSuccess,
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
          placeholder="Input your e-mail"
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
          placeholder="Input your password"
          iconStart={PasswordIcon}
          type="password"
          error={!!errors.password}
          messageErr={get(errors, 'password.message', '')}
        />
        <Button className={classes.forgotBtn} onClick={handleForgotPage}>
          {t('forgotPassword')}
        </Button>
        <LoadingButton variant="contained" fullWidth className={classes.btnSubmit} type="submit" loading={statusLogin === 'loading'}>
          {t('login')}
        </LoadingButton>
        <TextWithLink text={t('notHaveAccount')} highlight={t('register_link')} onClick={handleNavigate} />
      </Box>
    </form>
  );
}

export default LoginPage;
