import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import MyButton from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Option } from 'models/Field';
import { PaymentStatus } from 'models/PaymentStatus';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { momentToNumber } from 'utils/momentToNumber';
import { TableTicketSales } from './components/TableTicketSales';
import { fieldsSearch, fieldsSearch2 } from './constants';

const useStyles = makeStyles((theme: Theme) => ({
  buttonSearch: {
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
}));

interface Values {
  departurePoint?: { value: string };
  arrivalPoint?: { value: string };
  order_date?: any; // Moment
  order_id?: string;
  payment_status?: Option<PaymentStatus>;
}

export default function TicketSales() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const classes = useStyles();

  const { control, handleSubmit } = useForm<Values>();

  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isAgent = userInfo?.role === 'agent';
  const onSubmit = (values: Values) => {
    dispatch(
      ticketSalesActions.getTicketSalesRequest({
        page: 0,
        searcher: {
          departurePoint: {
            value: values.departurePoint?.value,
            operator: 'eq',
          },
          arrivalPoint: {
            value: values.arrivalPoint?.value,
            operator: 'eq',
          },
          createdAt: {
            value: momentToNumber(values.order_date),
            operator: 'gte',
          },
          orderCode: {
            value: values.order_id,
            operator: 'contains',
          },
          paymentStatus: {
            value: values.payment_status?.value,
            operator: 'eq',
          },
        },
        sorter: {},
      }),
    );
  };

  const handleAddTicket = () => {
    navigate('/agent/create-ticket-order');
  };

  useEffect(() => {
    dispatch(
      ticketSalesActions.getTicketSalesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('ticket_sales')} />
      <Box p="24px">
        <Grid container spacing={2}>
          <Grid item xs={12} md={isAgent ? 8 : 11}>
            <FilterTicket
              control={control}
              fields={isAgent ? fieldsSearch2 : fieldsSearch}
              filterKey="ticketSales"
              numberColumns={isAgent ? 2.5 : 2}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={isAgent ? 4 : 1}
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" spacing={2}>
              <Button variant="contained" fullWidth className={classes.buttonSearch} onClick={handleSubmit(onSubmit)}>
                {t('translation:search')}
              </Button>
              {userInfo?.role === 'agent' && (
                <MyButton variant="contained" fullWidth backgroundButton="#33CC7F" onClick={handleAddTicket} startIcon={<AddIcon />}>
                  {t('add_ticket_order')}
                </MyButton>
              )}
            </Stack>
          </Grid>
        </Grid>
        <TableTicketSales />
      </Box>
    </Box>
  );
}
