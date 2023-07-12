import CheckBoxIcon from '@mui/icons-material/CheckBox';
import { Button, Checkbox, FormControlLabel, Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { get } from 'lodash-es';
import Highlighter from 'react-highlight-words';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import MessageIcon from 'assets/images/message.svg';
import PasswordIcon from 'assets/images/password.svg';
import InputAuth from 'components/InputAuth/InputAuth';
import SelectCountry from 'components/SelectCountry/SelectCountry';
import TextWithLink from 'components/TextWithLink/TextWithLink';
import { useStyles } from './styles';
import { FieldError } from 'components/InputAuth/FieldError';

interface Values {
  email: string;
  password: string;
  country: string;
  terms: boolean;
}

function SignUp() {
  const classes = useStyles();
  const { t } = useTranslation('auth');
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitted },
    watch,
  } = useForm<Values>({
    defaultValues: {
      email: '',
      password: '',
      country: '',
      terms: false,
    },
    mode: 'all',
  });

  const onSubmit = (values: Values) => {
    console.log({ values });
  };

  const handleNavigate = () => {
    navigate('/login');
  };

  return (
    <Box className={classes.root}>
      <Grid className={classes.textWrap}>
        <Grid item xs={12}>
          <Highlighter
            textToHighlight={t('title_signup')}
            highlightClassName={classes.highlightText}
            searchWords={['Tbus']}
            autoEscape={true}
            className={classes.title}
          />
          <p className={classes.title}>{t('sub_title_signup')}</p>
        </Grid>
        <Typography component="p" className={classes.subTitle}>
          {t('signup_sub_2')}
        </Typography>
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
        messageErr={
          isSubmitted ? <FieldError fieldMessage={errors.password?.message} fieldValue={watch('password')} /> : get(errors, 'password.message', '')
        }
      />
      <Controller control={control} name="country" render={({ field }) => <SelectCountry {...field} />} />
      <Controller
        control={control}
        name="terms"
        render={({ field }) => (
          <FormControlLabel
            control={<Checkbox {...field} disableRipple checkedIcon={<CheckBoxIcon sx={{ color: '#C2C6C9' }} />} />}
            label={<TextWithLink sx={{ textAlign: 'left' }} text={t('term')} highlight={t('term_service')} />}
            sx={{
              marginTop: '8px',
            }}
          />
        )}
      />
      <Button variant="contained" fullWidth className={classes.btnSubmit} onClick={handleSubmit(onSubmit)}>
        {t('continue')}
      </Button>
      <TextWithLink text={t('haveAccount')} highlight={t('loginHere')} onClick={handleNavigate} />
    </Box>
  );
}

export default SignUp;
