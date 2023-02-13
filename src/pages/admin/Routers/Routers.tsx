import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Grid, Stack } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Menu } from 'antd';
import MyButton from 'components/Button/Button';
import DropdownCustom from 'components/DropdownCustom/DropdownCustom';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppSelector } from 'hooks/useAppSelector';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { v4 as uuidv4 } from 'uuid';
import TableRoutes from './components/TableRoutes';
import { fieldsSearch } from './constants';

interface Values {
  vehicles_name: string;
  departures_point: string;
  arrival_points: string;
  departure_time: string;
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
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const classes = useStyles();
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      arrival_points: '',
      departures_point: '',
      vehicles_name: '',
      departure_time: '',
    },
  });
  const handleAddNewTrip = (path: string) => () => {
    navigate('/admin/routers/' + path);
  };

  const menuChildren = (
    <>
      <Menu.Item className={classes.menuItem} onClick={handleAddNewTrip('create-oneway')}>
        {t('one_way_trip')}
      </Menu.Item>
      <Menu.Item className={classes.menuItem} onClick={handleAddNewTrip('create-multi')}>
        {t('multi_stops_trip')}
      </Menu.Item>
    </>
  );

  const onSubmit = (values: Values) => {
    console.log({ values });
  };

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
              <Button variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
                {t('translation:search')}
              </Button>
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
