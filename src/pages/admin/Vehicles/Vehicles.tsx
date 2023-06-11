import AddIcon from '@mui/icons-material/Add';
import { Grid, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
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
              <Grid item xs={8} md={7}>
                <FilterTicket control={control} fields={fieldsSearch} filterKey="vehicles" numberColumns={matches ? 4 : 10} />
              </Grid>
              <Grid
                item
                xs={8}
                md={1}
                sx={{
                  alignSelf: 'flex-end',
                  marginLeft: matches ? '-120px' : '0px',
                }}
              >
                <Button
                  variant="contained"
                  sx={{ width: matches ? '170px' : '100%' }}
                  backgroundButton={theme.palette.primary.main}
                  onClick={handleSubmit(onSubmit)}
                >
                  {t('translation:search')}
                </Button>
              </Grid>
            </Grid>
          </Grid>
          {!isAgent && (
            <Grid item xs={12} md={4} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
              <Button
                backgroundButton="#33CC7F"
                startIcon={<AddIcon />}
                sx={{ alignSelf: 'flex-end' }}
                className={classes.btnAdd}
                onClick={handleAdd}
              >
                {t('translation:add_new', { type: t('vehicles:vehicle').toLowerCase() })}
              </Button>
            </Grid>
          )}
        </Grid>
        <TableVehicles />
      </Box>
    </Box>
  );
}
