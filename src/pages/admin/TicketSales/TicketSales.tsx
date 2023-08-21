import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import { Button, Grid, Stack, Theme } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import MyButton from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Option } from 'models/Field';
import { EPaymentStatus } from 'models/PaymentStatus';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { ticketSalesActions } from 'store/ticketSales/ticketSalesSlice';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import { TableTicketSales } from './components/TableTicketSales';
import { fieldsSearch } from './constants';
import { Result } from 'components/SelectDecouplingData/SelectDestination';
import { UserRole } from 'utils/constant';

const useStyles = makeStyles((theme: Theme) => ({
  buttonSearch: {
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
}));

export interface FormSearchValues {
  departurePoint?: { value: Result };
  arrivalPoint?: { value: Result };
  departureTime?: [dayjs.Dayjs, dayjs.Dayjs];
  order_id?: string;
  payment_status?: Option<EPaymentStatus>;
}

export default function TicketSales() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const classes = useStyles();

  const { control, handleSubmit } = useForm<FormSearchValues>();

  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isAgent = userInfo?.role === UserRole.AGENT;

  const onSubmit = (values: FormSearchValues) => {
    dispatch(
      ticketSalesActions.getTicketSalesRequest({
        page: 0,
        searcher: {
          departurePointCode: {
            value: values.departurePoint?.value._id,
            operator: 'eq',
          },
          arrivalPointCode: {
            value: values.arrivalPoint?.value._id,
            operator: 'eq',
          },
          departureTime: [
            {
              value: values.departureTime?.[0] && dayjsToNumber(values.departureTime[0]),
              operator: 'gte',
            },
            {
              value: values.departureTime?.[0] && dayjsToNumber(values.departureTime[1]),
              operator: 'lte',
            },
          ],
          orderCode: {
            value: values.order_id,
            operator: 'contains',
          },
          paymentStatus: {
            value: !values.payment_status?.value
              ? undefined
              : values.payment_status?.value === EPaymentStatus.APPROVED
              ? EPaymentStatus.APPROVED
              : [EPaymentStatus.CREATED, EPaymentStatus.PENDING, EPaymentStatus.VOIDED],
            operator: 'in',
          },
        },
        sorter: {},
      }),
    );
  };

  const handleAddTicket = () => {
    navigate(isAgent ? '/agent/ticket-sales/create-ticket-order' : '/admin/ticket-sales/create-ticket-order');
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
        <Grid container spacing="14px">
          <Grid item xs={12} md={9.5}>
            <FilterTicket
              gap="14px"
              control={control}
              fields={fieldsSearch?.map(item => {
                if ('options' in item && item.label === 'payment_status') {
                  return {
                    ...item,
                    options: (item.options as any)?.map((option: Option) => ({
                      ...option,
                      label: t(`translation:${option.label}`),
                    })),
                  };
                }
                return item;
              })}
              filterKey="ticketSales"
              numberColumns={2.5}
              flexWrap={{ xs: 'wrap', md: 'nowrap' }}
            />
          </Grid>
          <Grid item xs={12} md={2.5} sx={{ alignSelf: 'flex-end' }}>
            <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
              <Button
                sx={{ width: '40px', height: '40px', minWidth: 'initial', fontSize: '18px' }}
                variant="contained"
                fullWidth
                className={classes.buttonSearch}
                onClick={handleSubmit(onSubmit)}
              >
                <SearchIcon fontSize="inherit" />
              </Button>
              <MyButton
                sx={{ minWidth: '92px' }}
                variant="contained"
                fullWidth
                backgroundButton="#33CC7F"
                onClick={handleAddTicket}
                startIcon={<AddIcon />}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {t('add_ticket_order')}
                </Box>
              </MyButton>
            </Stack>
          </Grid>
        </Grid>
        <TableTicketSales />
      </Box>
    </Box>
  );
}
