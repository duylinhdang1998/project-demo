import { Box, Divider, FormControlLabel, Grid, InputBase, InputLabel, Radio, RadioGroup, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import VisaPng from 'assets/images/visa.png';
import LayoutDetail from 'layout/LayoutDetail';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import FormTraveller from './components/FormTraveller';
import Reservation from './components/Reservation';

interface Values {
  email: string;
  method: string;
}

const data = [1, 2, 3, 4];

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
  img: {
    width: 36,
    height: 25,
  },
}));

export default function TravellerDetails() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const { control } = useForm<Values>();
  const classes = useStyles();

  return (
    <LayoutDetail title={t('create_ticket_orders')} subTitle={t('ticket_sales')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <Typography variant="h5">{t('traveller_contact_details')}</Typography>
              <Divider sx={{ margin: '16px 0' }} />
              <Box>
                {data.map((i, idx) => (
                  <Box key={i} my="16px">
                    <Typography variant="textBold" display="block" paddingBottom="16px">
                      {t('passenger')} {idx + 1}
                    </Typography>
                    <FormTraveller />
                  </Box>
                ))}
              </Box>
              <Divider sx={{ margin: '16px 0' }} />
              <Controller
                control={control}
                name="email"
                rules={{
                  required: true,
                }}
                render={({ field }) => (
                  <Box>
                    <InputLabel className={classes.label}>
                      {t('translation:email')} <span style={{ color: '#FF2727' }}>*</span>
                    </InputLabel>
                    <InputBase fullWidth {...field} placeholder={t('translation:email')} className={classes.input} />
                    <Typography fontSize={12} color="#B2BABE" mt="8px">
                      {t('translation:required_email')}
                    </Typography>
                  </Box>
                )}
              />
              <Divider sx={{ margin: '16px 0' }} />
              <Typography variant="h5">{t('payment_methods')}</Typography>
              <Stack direction="row" justifyContent="space-between" alignItems="center">
                <RadioGroup defaultValue="credit" name="metho">
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
            </Grid>
            <Grid item xs={12} md={4}>
              <Reservation />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </LayoutDetail>
  );
}
