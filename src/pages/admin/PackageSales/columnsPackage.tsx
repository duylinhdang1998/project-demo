import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { CalendarIcon, MapPinIcon } from 'assets';
import Tag from 'components/Tag/Tag';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import i18n from 'locales/i18n';
import { Package } from 'models/Package';
import TooltipMoreStatus from './components/TooltipMoreStatus';

export const columnsPackage: ColumnsType<Package> = [
  {
    key: 'orderId',
    dataIndex: 'orderId',
    align: 'center',
    width: 140,
    title: () => <div>{i18n.t('packageSales:orderId')}</div>,
  },
  {
    key: 'destination',
    dataIndex: 'destination',
    width: 250,
    align: 'left',
    title: () => <div>{i18n.t('packageSales:destination')}</div>,
    render: (value: string) => {
      return (
        <div>
          <TextWithIcon
            icon={MapPinIcon}
            text={value}
            typography={{
              fontSize: '14px',
            }}
            color="#1AA6EE"
          />
          <TextWithIcon
            icon={CalendarIcon}
            text={value}
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
    dataIndex: 'from',
    align: 'left',
    title: () => <div>{i18n.t('packageSales:from')}</div>,
    render: (value: string) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value}
        </Typography>
        <Typography fontSize="12px" color="#0C1132">
          0123456789
        </Typography>
      </div>
    ),
  },
  {
    key: 'recipent',
    dataIndex: 'recipent',
    align: 'left',
    title: () => <div>{i18n.t('packageSales:recipient')}</div>,
    render: (value: string) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value}
        </Typography>
        <Typography fontSize="12px" color="#0C1132">
          0123456789
        </Typography>
      </div>
    ),
  },
  {
    key: 'qty',
    dataIndex: 'qty',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:qty')}</div>,
    render: (value: string) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value}
        </Typography>
      </div>
    ),
  },
  {
    key: 'weight',
    dataIndex: 'weight',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:weight')}</div>,
    render: (value: string) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value}kg
        </Typography>
      </div>
    ),
    sorter: (a, b) => a?.weight ?? 0 - (b?.weight ?? 0),
  },
  {
    key: 'price',
    dataIndex: 'price',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:price')}</div>,
    render: (value: string) => (
      <div>
        <Typography fontSize="14px" color="#0C1132">
          {value}$
        </Typography>
      </div>
    ),
    sorter: (a, b) => a?.price ?? 0 - (b?.price ?? 0),
  },
  {
    key: 'status',
    dataIndex: 'status',
    align: 'center',
    title: () => <div>{i18n.t('packageSales:status')}</div>,
    render: (value: string[]) => (
      <Box display="flex" alignItems="center" justifyContent="center">
        {value.map((i, index) => index === 0 && <Tag key={index.toString()} text={i} variant={index % 2 === 0 ? 'success' : 'error'} />)}
        <TooltipMoreStatus status={value} text={`${value.length - 1}`} />
      </Box>
    ),
  },
];

export const dataPackageSales = () => {
  const data: Package[] = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      orderId: `66${i + 1}`,
      destination: 'Lyon Gare Perrache',
      from: 'Client A',
      recipent: 'Client B',
      qty: (i + 1).toString(),
      weight: i + 1,
      price: i * 2 + 1,
      status: ['Not Paid', 'Paid', 'Not arrived at destinations', 'Delivered to recipient'],
    });
  }
  return data;
};
