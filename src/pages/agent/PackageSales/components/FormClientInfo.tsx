import { Box, Divider, Grid, InputBase, InputLabel, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from 'lodash-es';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fields2, fields3 } from '../constant';
import FormMerchandise from './FormMerchandise';
import { Field } from 'models/Field';
import { FieldValues } from '../ClientInfo';
import { RouteOfTicketSale } from 'services/models/TicketSale';

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
  control: Control<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  routeDetail?: RouteOfTicketSale;
}

export default function FormClientInfo({ control, errors, routeDetail }: Props) {
  const { t } = useTranslation(['packageSales', 'translation', 'account']);
  const classes = useStyles();

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
                      {t(`${f.label}`)} {f.required && <span className={classes.error}>*</span>}
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
                validate: value => !!value.trim() || t('translation:error_required', { name: t(`packageSales:${f.label}`).toLowerCase() }),
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
      <FormMerchandise control={control} errors={errors} routeDetail={routeDetail} />
      <Divider sx={{ margin: '16px 0' }} />
      <Controller
        name="email"
        control={control}
        render={({ field }) => {
          return (
            <Box>
              <InputLabel htmlFor="email" className={classes.label}>
                {t(`email`)} <span className={classes.error}>*</span>
              </InputLabel>
              <InputBase fullWidth id="email" {...field} placeholder={t(`email`)} className={classes.input} error={!!errors} />
              {!!errors && (
                <Typography component="p" className={classes.error} fontSize={12}>
                  {get(errors, `email.message`, '')}
                </Typography>
              )}
              <Typography fontSize={12} color="#B2BABE" mt="6px">
                {t('packageSales:required_in_order')}
              </Typography>
            </Box>
          );
        }}
        rules={{
          required: {
            value: true,
            message: t('translation:error_required', { name: t(`packageSales:email`).toLowerCase() }),
          },
          validate: value => !!value.trim() || t('translation:error_required', { name: t(`packageSales:email`).toLowerCase() }),
        }}
      />
      <Divider sx={{ margin: '16px 0' }} />
    </Box>
  );
}
