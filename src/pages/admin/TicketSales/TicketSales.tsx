import AddIcon from '@mui/icons-material/Add';
import { Button, Grid, Stack, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import dayjs from 'dayjs';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { MapPinIcon } from 'assets';
import AntTable from 'components/AntTable/AntTable';
import MyButton from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { useAppSelector } from 'hooks/useAppSelector';
import { Ticket } from 'models/Ticket';
import { selectAuth } from 'store/auth/selectors';
import { dataTicketDemo, fieldsSearch, fieldsSearch2, keysFieldsSearch } from './constants';

const useStyles = makeStyles((theme: Theme) => ({
  buttonSearch: {
    backgroundColor: theme.palette.primary.main,
    height: '40px',
    '&:hover': {
      backgroundColor: theme.palette.primary.main + '!important',
    },
  },
}));

type Values = Record<typeof keysFieldsSearch[number], string>;

export default function TicketSales() {
  const { t } = useTranslation(['ticketSales', 'translation']);
  const classes = useStyles();
  const { userInfo } = useAppSelector(selectAuth);
  const navigate = useNavigate();
  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      arrival_points: '',
      departures_point: '',
      order_id: '',
      payment_status: '',
    },
  });

  const columnsTicket: ColumnsType<Ticket> = [
    {
      key: 'lastName',
      dataIndex: 'lastName',
      width: 90,
      title: () => <div>{t('lastName')}</div>,
      render: (value: string) => {
        return (
          <Typography sx={{ cursor: 'pointer' }} fontSize="14px">
            {value}
          </Typography>
        );
      },
    },
    {
      key: 'firstName',
      dataIndex: 'firstName',
      width: 90,
      title: () => <div>{t('firstName')}</div>,
    },
    {
      key: 'trip',
      dataIndex: 'trip',
      width: 200,
      title: () => <div>{t('trip')}</div>,
      render: (value: Ticket['trip']) =>
        value?.map((i, idx) => (
          <TextWithIcon
            icon={MapPinIcon}
            key={idx}
            text={i}
            typography={{
              fontSize: '14px',
            }}
            color="#1AA6EE"
          />
        )),
    },
    {
      key: 'dateTime',
      dataIndex: 'dateTime',
      title: () => <div>{t('dateTime')}</div>,
      width: 120,
      render: (value: Ticket['dateTime']) => {
        return <div>{dayjs(value).format('MM/DD/YYYY - HH:mm')}</div>;
      },
      align: 'center',
    },
    {
      key: 'paxCount',
      dataIndex: 'paxCount',
      title: () => <div>{t('paxCount')}</div>,
      width: 120,
      align: 'center',
      sorter: (a, b) => a?.paxCount ?? 0 - (b?.paxCount ?? 0),
    },
    {
      key: 'payment_status',
      dataIndex: 'payment_status',
      title: () => <div>{t('payment_status')}</div>,
      width: 120,
      align: 'center',
      render: (value: string) => {
        return <Tag color={value === 'Paid' ? '#33CC7F' : '#FF2727'} backgroundColor={value === 'Paid' ? '#F1FFF4' : '#FFEDED'} text={value} />;
      },
    },
    {
      key: 'orderId',
      dataIndex: 'orderId',
      title: () => <div>{t('order_id')}</div>,
      width: 80,
      align: 'center',
      sorter: true,
    },
    {
      key: 'createdBy',
      dataIndex: 'createdBy',
      title: () => <div>{t('createdBy')}</div>,
      width: 120,
      align: 'center',
    },
  ];

  const isAgent = userInfo?.role === 'agent';

  const onSubmit = (values: Values) => {
    console.log({ values });
  };

  const handleClickRow = (record: Ticket) => () => {
    const nextUrl = isAgent ? '/agent/ticket-sales/' : '/admin/ticket-sales/';
    navigate(nextUrl + record.id, { state: { record } });
  };

  const handleAddTicket = () => {
    navigate('/agent/create-ticket-order');
  };

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
        <Box my="30px">
          <AntTable
            columns={columnsTicket}
            dataSource={dataTicketDemo()}
            rowKey={record => record.id}
            onRow={record => {
              return {
                onClick: handleClickRow(record),
              };
            }}
          />
        </Box>
      </Box>
    </Box>
  );
}
