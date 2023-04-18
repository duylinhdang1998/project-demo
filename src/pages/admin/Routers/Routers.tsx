import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from 'antd';
import MyButton from 'components/Button/Button';
import DropdownCustom from 'components/DropdownCustom/DropdownCustom';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Vehicle } from 'services/models/Vehicle';
import { selectAuth } from 'store/auth/selectors';
import { routesActions } from 'store/routes/routesSlice';
import { dayjsToString } from 'utils/dayjsToString';
import { v4 as uuidv4 } from 'uuid';
import TableRoutes from './components/TableRoutes';
import { fieldsSearch } from './constants';

interface Values {
  vehicleName?: Vehicle;
  departurePoints?: { value: string };
  arrivalPoints?: { value: string };
  // FIXME: Chuyển qua range picker
  departureTime?: dayjs.Dayjs;
}

const useStyles = makeStyles(() => ({
  menuList: {
    width: 180,
    borderRadius: '8px',
  },
  menuItem: {
    textAlign: 'center',
    padding: '8px 0',
  },
}));

export default function Routers() {
  const { t } = useTranslation(['routers', 'translation']);
  const navigate = useNavigate();
  const classes = useStyles();
  const { control, handleSubmit } = useForm<Values>();

  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const handleAddNewTrip = (path: string) => () => {
    navigate('/admin/routers/' + path);
  };

  const menuChildren = (
    <>
      <Menu.Item key="ONE_WAY" className={classes.menuItem} onClick={handleAddNewTrip('create-oneway')}>
        {t('one_way_trip')}
      </Menu.Item>
      <Menu.Item key="MULTI" className={classes.menuItem} onClick={handleAddNewTrip('create-multi')}>
        {t('multi_stops_trip')}
      </Menu.Item>
    </>
  );

  const onSubmit = (values: Values) => {
    dispatch(
      routesActions.getRoutesRequest({
        page: 0,
        searcher: {
          departurePoint: {
            value: values.departurePoints?.value,
            operator: 'eq',
          },
          'routePoints.stopPoint': {
            value: values.arrivalPoints?.value,
            operator: 'eq',
          },
          departureTime: {
            value: values.departureTime ? dayjsToString(values.departureTime, 'HH:mm') : undefined,
            operator: 'eq',
          },
          'vehicle.brand': {
            value: values.vehicleName?.brand,
            operator: 'eq',
          },
        },
        sorter: {},
      }),
    );
  };

  useEffect(() => {
    dispatch(
      routesActions.getRoutesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('routers')} />
      <Box p="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={userInfo?.role === 'admin' ? 8 : 10}>
            <FilterTicket
              control={control}
              fields={userInfo?.role === 'admin' ? fieldsSearch : [...fieldsSearch, { id: uuidv4(), label: 'registrationId', type: 'text' }]}
              filterKey="routers"
              numberColumns={userInfo?.role === 'admin' ? 2.5 : 2}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={userInfo?.role === 'admin' ? 4 : 2}
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" spacing={2}>
              <MyButton backgroundButton="#1aa6ee" variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
                {t('translation:search')}
              </MyButton>
              {userInfo?.role === 'admin' && (
                <DropdownCustom menuChildren={menuChildren} trigger={['click']} placement="bottomLeft" menuClassName={classes.menuList}>
                  <MyButton variant="contained" fullWidth backgroundButton="#33CC7F" startIcon={<AddIcon />}>
                    {t('add_new_trip')}
                  </MyButton>
                </DropdownCustom>
              )}
            </Stack>
          </Grid>
        </Grid>
        <TableRoutes />
      </Box>
    </Box>
  );
}
