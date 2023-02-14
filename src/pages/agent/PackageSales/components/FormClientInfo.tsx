import { Box, Divider, FormControlLabel, Grid, InputBase, InputLabel, Radio, RadioGroup, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { get } from 'lodash';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import Select from 'react-select';
import VisaPng from 'assets/images/visa.png';
import { customStyles } from 'components/FilterTicket/customStyles';
import FormVerticle from 'components/FormVerticle/FormVerticle';
import { fields4 } from '../constant';

interface StateLocation {
  merchandise: {
    title: string;
    weight: string;
    price: string;
  }[];
}

interface FieldValues {
  firstName: string;
  lastName: string;
  merchandise: StateLocation['merchandise'];
}

const options = [
  { key: 'pkg_2', value: 'pkg_2', label: 'Package 2kg' },
  { key: 'pkg_3', value: 'pkg_3', label: 'Package 3kg' },
];

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
}));

export default function FormClientInfo() {
  const { t } = useTranslation(['packageSales', 'translation', 'account']);
  const location = useLocation();
  const state: StateLocation = get(location, 'state.merchandise', {});
  const classes = useStyles();

  const { control } = useForm<FieldValues>({
    defaultValues: {
      merchandise: [{ title: '', weight: '', price: '' }],
    },
  });

  return (
    <Box>
      <FormVerticle fields={fields4} grid isGridHorizon indexGridHorizon={2} control={control} filterKey="passenger" />
      <Typography fontSize={12} color="#B2BABE" mt="4px" component="p">
        {t('required_in_order')}
      </Typography>
      <Divider sx={{ margin: '16px 0' }} />
      <Box>
        {state.merchandise.map((i, index) => (
          <Box key={`merchandise_${index}`}>
            <Typography variant="h5" mb="16px">
              {t('translation:merchandise')} {index + 1}
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name={`merchandise.${index}.title`}
                  render={({ field }) => (
                    <Box>
                      <InputLabel htmlFor={`merchandise.${index}.weight`} className={classes.label}>
                        {t(`weight`)}
                      </InputLabel>
                      <Select {...field} id={`merchandise.${index}.title`} options={options} styles={customStyles} placeholder={t(`title`)} />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name={`merchandise.${index}.weight`}
                  render={({ field }) => (
                    <Box>
                      <InputLabel htmlFor={`merchandise.${index}.weight`} className={classes.label}>
                        {t(`weight`)}
                      </InputLabel>
                      <InputBase fullWidth {...field} id={`merchandise.${index}.weight`} placeholder={t(`weight`)} className={classes.input} />
                    </Box>
                  )}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Controller
                  control={control}
                  name={`merchandise.${index}.weight`}
                  render={({ field }) => (
                    <Box>
                      <InputLabel htmlFor={`merchandise.${index}.price`} className={classes.label}>
                        {t(`price`)}
                      </InputLabel>
                      <Box className={classes.inputNumberWrap}>
                        <span className={classes.prefix}>$</span>
                        <input {...field} id={`merchandise.${index}.price`} min={0} type="number" className={classes.inputNumber} />
                      </Box>
                    </Box>
                  )}
                />
              </Grid>
            </Grid>
            <Divider sx={{ borderStyle: index === state.merchandise.length - 1 ? 'solid' : 'dashed', margin: '16px 0' }} />
          </Box>
        ))}
      </Box>
      <Typography variant="h5">{t('account:payment_methods')}</Typography>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <RadioGroup defaultValue="credit" name="method">
          <FormControlLabel
            value="credit"
            control={<Radio />}
            label="Credit card"
            sx={{
              '.MuiFormControlLabel-label': {
                fontSize: '14px !important',
              },
            }}
          />
        </RadioGroup>
        <img src={VisaPng} className={classes.img} />
      </Stack>
    </Box>
  );
}
