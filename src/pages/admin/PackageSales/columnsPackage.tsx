import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { CalendarIcon, MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import i18n from 'locales/i18n';
import { PackageSale } from 'models/PackageSales';
import { PaymentStatus } from 'models/PaymentStatus';

export const getTotal = (arr: PackageSale['merchandises'], key: string) => {
  return arr?.reduce((s, item) => {
    return (s += item[key]);
  }, 0);
};

export const columnsPackage: ColumnsType<PackageSale> = [
  {
    key: 'orderId',
    dataIndex: 'orderCode',
    align: 'center',
    width: 140,
    title: () => <div>{i18n.t('packageSales:orderId')}</div>,
  },
  {
    key: 'destination',
    dataIndex: 'trip',
    width: 250,
    align: 'left',
    title: () => <div>{i18n.t('packageSales:destination')}</div>,
    render: (trip: PackageSale['trip']) => {
      return (
        <div>
          <TextWithIcon
            icon={MapPinIcon}
            text={trip?.departurePoint?.officialName}
            typography={{
              fontSize: '14px',
            }}
            color="#1AA6EE"
          />
          <TextWithIcon
            icon={CalendarIcon}
            text={trip?.arrivalPoint?.officialName}
            typography={{
              fontSize: '12px',
            }}
            color="#1AA6EE"
          />
        </div>
      );
    },
  },
  {
    key: 'from',
    dataIndex: 'sender',
    align: 'left',
    title: () => <div>{i18n.t('packageSales:from')}</div>,
    render: (value: PackageSale['sender']) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {`${value?.firstName} ${value?.lastName}`}
        </Typography>
        <Typography fontSize="12px" color="#0C1132">
          {value?.mobile}
        </Typography>
      </div>
    ),
  },
  {
    key: 'recipent',
    dataIndex: 'recipent',
    align: 'left',
    title: () => <div>{i18n.t('packageSales:recipient')}</div>,
    render: (value: PackageSale['recipent']) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {`${value?.firstName} ${value?.lastName}`}
        </Typography>
        <Typography fontSize="12px" color="#0C1132">
          {value?.mobile}
        </Typography>
      </div>
    ),
  },
  {
    key: 'qty',
    dataIndex: 'merchandises',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:qty')}</div>,
    render: (value: PackageSale['merchandises']) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value?.length}
        </Typography>
      </div>
    ),
  },
  {
    key: 'weight',
    dataIndex: 'merchandises',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:weight')}</div>,
    render: (value: PackageSale['merchandises']) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {getTotal(value, 'weight')}kg
        </Typography>
      </div>
    ),
    sorter: () => 0,
  },
  {
    key: 'price',
    dataIndex: 'merchandises',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:price')}</div>,
    render: (value: PackageSale['merchandises']) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {getTotal(value, 'price')}$
        </Typography>
      </div>
    ),
    sorter: () => 0,
  },
  {
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:status')}</div>,
    render: (_, item) => (
      <Box display="flex" alignItems="center" justifyContent="center">
        <Tag text={item.paymentId?.paymentStatus} variant={item.paymentId?.paymentStatus === PaymentStatus.APPROVED ? 'success' : 'error'} />
        {/* <TooltipMoreStatus status={item.paymentId?.paymentStatus} text={`${value.length - 1}`} /> */}
      </Box>
    ),
  },
];
