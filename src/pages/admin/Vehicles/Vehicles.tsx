import AddIcon from '@mui/icons-material/Add';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box, Stack } from '@mui/system';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAuth } from 'store/auth/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import TableVehicles from './components/TableVehicles';
import { fieldsSearch } from './constants';

const useStyles = makeStyles(() => ({
  btnAdd: {
    height: '40px !important',
    padding: '10px 30px !important',
  },
}));

interface Values {
  vehicle: string;
  registrationId: string;
}

export default function Vehicles() {
  const { t } = useTranslation(['vehicles', 'translation']);
  const theme = useTheme();
  const navigate = useNavigate();
  const matches = useMediaQuery('(min-width:1200px)');

  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const isAgent = userInfo?.role === 'agent';

  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      vehicle: '',
      registrationId: '',
    },
  });
  const classes = useStyles();
  const handleAdd = () => {
    navigate(isAgent ? '/agent/vehicles/add-new-vehicles' : '/admin/vehicles/add-new-vehicles');
  };
  const onSubmit = (values: Values) => {
    dispatch(
      vehiclesActions.getVehiclesRequest({
        page: 0,
        sorter: {},
        searcher: {
          registrationId: { value: values.registrationId, operator: 'contains' },
          brandModel: { value: values.vehicle, operator: 'contains' },
        },
      }),
    );
  };

  useEffect(() => {
    dispatch(
      vehiclesActions.getVehiclesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('vehicles:vehicles')} />
      <Box padding="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container columns={8} rowSpacing={2}>
              <Grid item xs={8} md={4}>
                <FilterTicket control={control} fields={fieldsSearch} filterKey="vehicles" numberColumns={matches ? 4 : 10} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={4} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Stack direction="row" spacing="16px" alignItems="center" alignSelf="flex-end">
              <Button
                variant="contained"
                sx={{ width: matches ? '170px' : '100%' }}
                backgroundButton={theme.palette.primary.main}
                onClick={handleSubmit(onSubmit)}
              >
                {t('translation:search')}
              </Button>
              {!isAgent && (
                <Button backgroundButton="#33CC7F" startIcon={<AddIcon />} className={classes.btnAdd} onClick={handleAdd}>
                  {t('vehicles:create_vehicle')}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
        <TableVehicles />
      </Box>
    </Box>
  );
}
