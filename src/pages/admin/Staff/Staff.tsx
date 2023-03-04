import AddIcon from '@mui/icons-material/Add';
import { Box, Grid, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import TableStaff from './components/TableStaff';
import { fieldsSearch } from './constants';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectStaffs } from 'store/staffs/selectors';
import { useEffect } from 'react';
import { staffsActions } from 'store/staffs/staffsSlice';
import { UserRole } from 'services/models/UserRole';

const useStyles = makeStyles(() => ({
  btnAdd: {
    height: '40px !important',
    padding: '10px 30px !important',
  },
}));

interface Values {
  role?: { role: UserRole };
  name: string;
  phone: string;
}

export default function Staff() {
  const { t } = useTranslation(['staff', 'translation']);
  const theme = useTheme();
  const navigate = useNavigate();
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:1200px)');

  const { control, reset, handleSubmit } = useForm<Values>({
    defaultValues: {
      name: '',
      phone: '',
    },
  });

  const dispatch = useAppDispatch();
  const { currentSearcher } = useAppSelector(selectStaffs);

  const handleAdd = () => {
    navigate('/admin/staffs/add-new-staff');
  };

  const onSubmit = (values: Values) => {
    dispatch(
      staffsActions.getStaffsRequest({
        page: 0,
        sorter: {},
        searcher: {
          phone: { value: values.phone, operator: 'contains' },
          lastName: { value: values.name, operator: 'contains' },
          role: { value: values.role?.role, operator: 'eq' },
        },
      }),
    );
  };

  useEffect(() => {
    reset({
      phone: currentSearcher.phone?.value,
      name: currentSearcher.lastName?.value,
      role: {
        role: currentSearcher.role?.value as UserRole | undefined,
      },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentSearcher]);

  useEffect(() => {
    dispatch(
      staffsActions.getStaffsRequest({
        page: 0,
        sorter: {},
        searcher: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('staff')} />
      <Box padding="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <Grid container columns={8} rowSpacing={2}>
              <Grid item xs={8} md={7}>
                <FilterTicket control={control} fields={fieldsSearch} filterKey="staff" numberColumns={matches ? 3 : 10} />
              </Grid>
              <Grid item xs={8} md={1} sx={{ alignSelf: 'flex-end', marginLeft: matches ? '-48px' : '0px' }}>
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
          <Grid item xs={12} md={4} sx={{ justifyContent: 'flex-end', display: 'flex' }}>
            <Button backgroundButton="#33CC7F" startIcon={<AddIcon />} sx={{ alignSelf: 'flex-end' }} className={classes.btnAdd} onClick={handleAdd}>
              {t('translation:add_new', { type: t('staff').toLowerCase() })}
            </Button>
          </Grid>
        </Grid>
        <TableStaff />
      </Box>
    </Box>
  );
}
