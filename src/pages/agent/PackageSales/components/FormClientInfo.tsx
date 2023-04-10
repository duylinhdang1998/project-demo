import { Box, Divider, Grid, InputBase, InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from 'lodash-es';
import { Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { fields2, fields3 } from '../constant';
import FormMerchandise from './FormMerchandise';
import { Field } from 'models/Field';

const useStyles = makeStyles((theme: Theme) => ({
  label: {
    color: theme.palette.grey[200],
    fontSize: '14px !important',
    marginBottom: '4px',
    fontWeight: '400 !important',
  },
  input: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    fontSize: '14px !important',
    height: '40px',
    padding: '0 10px',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  inputNumberWrap: {
    border: '1px solid #F7F7F7',
    backgroundColor: '#fff',
    borderRadius: '4px',
    height: '40px',
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    padding: '0 10px',
  },
  inputNumber: {
    width: '100%',
    height: '35px',
    borderColor: 'transparent',
    '&:focus-visible': {
      outline: 'none',
    },
  },
  prefix: {
    fontSize: '14px',
  },
  img: {
    width: 36,
    height: 25,
  },
  error: {
    marginTop: '4px !important',
    color: theme.palette.error.main,
  },
}));

interface Props {
  control: any;
  errors?: any;
}

export default function FormClientInfo({ control, errors }: Props) {
  const { t } = useTranslation(['packageSales', 'translation', 'account']);
  const location = useLocation();
  const classes = useStyles();
  console.log('location', location);

  const renderField = (fields: Field[]) => {
    return (
      <Grid container spacing="10px" columns={12}>
        {fields.map(f => (
          <Grid key={f.id} item xs={12} lg={4}>
            <Controller
              name={f.label as any}
              control={control}
              render={({ field }) => {
                return (
                  <Box>
                    <InputLabel htmlFor={f.label} className={classes.label}>
                      {t(`${f.label}`)} <span className={classes.error}>*</span>
                    </InputLabel>
                    <InputBase
                      fullWidth
                      id={f.label}
                      {...field}
                      placeholder={t(`${f.label}`)}
                      className={classes.input}
                      error={!!errors}
                      disabled={f.disabled}
                    />
                    {!!errors && (
                      <Typography component="p" className={classes.error} fontSize={12}>
                        {get(errors, `${f.label}.message`, '')}
                      </Typography>
                    )}
                  </Box>
                );
              }}
              rules={{
                required: {
                  value: f.required ?? false,
                  message: t('translation:error_required', { name: t(`packageSales:${f.label}`).toLowerCase() }),
                },
              }}
            />
          </Grid>
        ))}
      </Grid>
    );
  };

  return (
    <Box>
      <Box my="10px">
        <Typography mb="10px" fontWeight={700}>
          {t('packageSales:sender')}
        </Typography>
        {renderField(fields2)}
      </Box>
      <Box my="10px">
        <Typography fontWeight={700} mb="10px">
          {t('packageSales:recipent')}
        </Typography>
        {renderField(fields3)}
      </Box>
      <Typography fontSize={12} color="#B2BABE" mt="4px" component="p">
        {t('required_in_order')}
      </Typography>
      <Divider sx={{ margin: '16px 0' }} />
      <FormMerchandise control={control} />
    </Box>
  );
}
