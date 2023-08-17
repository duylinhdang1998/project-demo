import { Box, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { MapPinIcon, StopCircleSvg } from 'assets';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { ITrackingRoute, useGetRouteProgramDashboard } from 'services/Dashboard/dashboard';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { useMount } from 'ahooks';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import dayjs from 'dayjs';

function TableDashboard() {
  const { t } = useTranslation(['dashboard']);
  const { data, loading, run } = useGetRouteProgramDashboard();
  const [currentPage, setCurrentPage] = useState(0);

  useMount(() => {
    run({
      page: 0,
      sorter: {},
      searcher: {},
    });
  });

  const columns: ColumnsType<ITrackingRoute> = [
    {
      key: 'id',
      dataIndex: '_id',
      title: () => <Typography variant="headerTable">{t('id')}</Typography>,
      sorter: true,
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      width: 100,
      align: 'center',
    },
    {
      key: 'route',
      dataIndex: 'route',
      title: () => <Typography variant="headerTable">{t('route')}</Typography>,
      sorter: true,
      render: (_, item) => {
        return (
          <Box>
            <TextWithIcon text={item.route.departurePoint} icon={MapPinIcon} color="#2D9AFF" />
            <TextWithIcon text={item.route.stopPoint} icon={StopCircleSvg} color="#33CC7F" />
          </Box>
        );
      },
    },
    {
      key: 'departure_time',
      dataIndex: 'departure_time',
      title: () => <Typography variant="headerTable">{t('departure_time')}</Typography>,
      sorter: true,
      render: (_, record) => <Typography variant="body2">{dayjs(record.dateRoute).format('HH:mm')}</Typography>,
    },
    {
      key: 'arrival_time',
      dataIndex: 'arrival_time',
      title: () => <Typography variant="headerTable">{t('arrival_time')}</Typography>,
      sorter: true,
      render: (_, record) => (
        <Typography variant="body2">{dayjs(record.dateRoute).add(record.route?.durationTime, 'minute').format('HH:mm')}</Typography>
      ),
    },
    {
      key: 'vehicle',
      dataIndex: 'vehicle',
      title: () => <Typography variant="headerTable">{t('vehicles')}</Typography>,
      sorter: true,
      render: (vehicle: ITrackingRoute['vehicle']) => (
        <Box>
          <Typography variant="body2">{vehicle.brand}</Typography>
          <Typography variant="body2">{vehicle.model}</Typography>
        </Box>
      ),
      align: 'center',
      width: 120,
    },
    {
      key: 'VIPseats',
      dataIndex: 'seatsAvailable',
      title: () => <Typography variant="headerTable">{t('VIPseats')}</Typography>,
      render: (value: ITrackingRoute['seatsAvailable'], item) => (
        <Typography variant="body2" color={value?.VIP === item.vehicle.VIPseats ? '#FF2727' : 'inherit'}>
          {value?.VIP === item.vehicle.VIPseats ? 'Full' : value?.VIP}
        </Typography>
      ),
      width: 120,
      align: 'center',
    },
    {
      key: 'ECOseats',
      dataIndex: 'seatsAvailable',
      title: () => <Typography variant="headerTable">{t('ECOseats')}</Typography>,
      render: (value: ITrackingRoute['seatsAvailable'], item) => (
        <Typography variant="body2" color={value?.ECO === item.vehicle.ECOseats ? '#FF2727' : 'inherit'}>
          {value?.ECO === item.vehicle.ECOseats ? 'Full' : value?.ECO}
        </Typography>
      ),
      width: 120,
      align: 'center',
    },
  ];

  return (
    <Box my="30px">
      <AntTable
        dataSource={data?.hits ?? []}
        columns={columns}
        loading={loading}
        rowKey={r => r._id ?? ''}
        pagination={{
          total: data?.pagination.totalRows,
          showLessItems: true,
          showSizeChanger: false,
          pageSize: 10,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
          run({
            page: getPaginationFromAntdTable({ pagination, extra }),
            sorter: getSorterParamsFromAntdTable({ sorter }),
            searcher: {},
          });
        }}
        title={() => (
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">{t('route_program')}</Typography>
            <Button variant="text" sx={{ color: '#1AA6EE', fontWeight: 'bold' }}>
              {t('see_all_trip')}
            </Button>
          </Stack>
        )}
      />
    </Box>
  );
}

export default memo(TableDashboard);
