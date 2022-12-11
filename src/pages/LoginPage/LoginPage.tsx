import { Button, Grid } from '@mui/material';
import { Box } from '@mui/system';
import logoTbus from 'assets/images/logo-blue.png';
import MessageIcon from 'assets/images/message.svg';
import PasswordIcon from 'assets/images/password.svg';
import InputAuth from 'components/InputAuth/InputAuth';
import TextWithLink from 'components/TextWithLink/TextWithLink';
import { get } from 'lodash';
import React from 'react';
import Highlighter from 'react-highlight-words';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import useAuthStore from './store/auth';
import { useStyles } from './styles';

interface Values {
  email: string;
  password: string;
}

function LoginPage() {
  const { t } = useTranslation('auth');
  const classes = useStyles();
  const navigate = useNavigate();
  const { login, userInfo } = useAuthStore();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Values>({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'all',
  });
  const handleNavigate = () => {
    navigate('/auth/sign-up');
  };

  const onSubmit = (values: Values) => {
    console.log({ values });
    login(values.email + values.password, values.email.includes('admin') ? 'admin' : 'agent');
    // console.log({ aaa: userInfo });
    navigate(values.email.includes('admin') ? '/admin' : '/agent', { replace: true });
  };

  const handleForgotPage = () => {
    navigate('/auth/forgot-password');
  };

  return (
    <Box className={classes.root}>
      <Box display={{ mobile: 'block', desktop: 'none' }} textAlign="center" mb="50px">
        <img src={logoTbus} alt="logo" width="50%" />
      </Box>
      <Grid className={classes.textWrap}>
        <Grid item xs={12} md={8}>
          <Highlighter textToHighlight={t('title_login')} highlightClassName={classes.highlightText} searchWords={['Tbus']} autoEscape={true} className={classes.title} />
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
      <Button variant="contained" fullWidth className={classes.btnSubmit} onClick={handleSubmit(onSubmit)}>
        {t('login')}
      </Button>
      <TextWithLink text={t('notHaveAccount')} highlight={t('register_link')} onClick={handleNavigate} />
    </Box>
  );
}

export default LoginPage;
