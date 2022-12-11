import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import SendIcon from 'components/SvgIcon/SendIcon';
import { isEmpty } from 'lodash';
import { PassengerTypeColumn } from 'models/Passenger';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import TablePassenger from './components/TablePassenger';
import { fieldsSearch } from './constants';

const useStyles = makeStyles(() => ({
  btnAdd: {
    height: '40px !important',
    padding: '10px 30px !important',
  },
}));

interface Values {
  email: string;
  name: string;
  mobile: string;
}

export default function Passengers() {
  const { t } = useTranslation(['passenger', 'translation']);
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const [disabled, setDisabled] = useState(true);
  const matches = useMediaQuery('(min-width:1200px)');

  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      email: '',
      name: '',
      mobile: '',
    },
  });
  const handleBatch = () => {
    console.log('batch_email');
    // navigate('/admin/add-new-staff');
  };
  const onSubmit = (values: Values) => {
    console.log({ values });
  };

  const handleSelect = (selectedRows: PassengerTypeColumn[]) => {
    setDisabled(isEmpty(selectedRows));
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('passengers')} />
      <Box padding="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container columns={8} rowSpacing={2}>
              <Grid item xs={8} md={7}>
                <FilterTicket control={control} fields={fieldsSearch} filterKey="passenger" numberColumns={matches ? 3 : 10} />
              </Grid>
              <Grid item xs={8} md={1} sx={{ alignSelf: 'flex-end', marginLeft: matches ? '-48px' : '0px' }}>
                <Button variant="contained" sx={{ width: matches ? '170px' : '100%' }} backgroundButton={theme.palette.primary.main} onClick={handleSubmit(onSubmit)}>
                  {t('translation:search')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button
              backgroundButton="#33CC7F"
              sx={{ alignSelf: 'flex-end' }}
              disabled={disabled}
              startIcon={<SendIcon />}
              className={classes.btnAdd}
              onClick={handleBatch}>
              {t('translation:batch_email')}
            </Button>
          </Grid>
        </Grid>
        <TablePassenger onSelect={handleSelect} />
      </Box>
    </Box>
  );
}
