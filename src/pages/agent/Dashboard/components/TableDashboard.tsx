import { Box, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { MapPinIcon, StopCircleSvg } from 'assets';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { RoutePrograms } from 'models/RoutePrograms';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';

const dataSource: RoutePrograms[] = [];

for (let i = 0; i < 13; i++) {
  dataSource.push({
    id: i.toString(),
    route: ['Lyon Gare Perrache', '5 arrets', 'Lyon Gare Perrache'],
    departure_time: '02/27/2022 - 10H30',
    arrival_time: '02/27/2022 - 14H30',
    vehicle: 'Mercedes',
    VIPseats: i + 1,
    ECOseats: i + 1,
  });
}

function TableDashboard() {
  const { t } = useTranslation(['dashboard']);
  const columns: ColumnsType<RoutePrograms> = [
    {
      key: 'id',
      dataIndex: 'id',
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
      render: (value: string[]) => {
        return value.map((v, index) =>
          index !== 1 ? (
            <TextWithIcon key={index.toString()} text={v} icon={MapPinIcon} color="#2D9AFF" />
          ) : (
            <TextWithIcon text={v} key={index.toString()} icon={StopCircleSvg} color="#33CC7F" />
          ),
        );
      },
    },
    {
      key: 'departure_time',
      dataIndex: 'departure_time',
      title: () => <Typography variant="headerTable">{t('departure_time')}</Typography>,
      sorter: true,
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
    },
    {
      key: 'arrival_time',
      dataIndex: 'arrival_time',
      title: () => <Typography variant="headerTable">{t('arrival_time')}</Typography>,
      sorter: true,
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
    },
    {
      key: 'vehicle',
      dataIndex: 'vehicle',
      title: () => <Typography variant="headerTable">{t('vehicles')}</Typography>,
      sorter: true,
      render: (value: string) => (
        <Box>
          <Typography variant="body2">{value}</Typography>
          <Typography variant="body2">DX728AM</Typography>
        </Box>
      ),
      align: 'center',
      width: 120,
    },
    {
      key: 'VIPseats',
      dataIndex: 'VIPseats',
      title: () => <Typography variant="headerTable">{t('VIPseats')}</Typography>,
      render: (value: number) => <Typography variant="body2">{value}</Typography>,
      width: 120,
      align: 'center',
    },
    {
      key: 'ECOseats',
      dataIndex: 'ECOseats',
      title: () => <Typography variant="headerTable">{t('ECOseats')}</Typography>,
      render: (value: number) => (
        <Typography variant="body2" color={value === 12 ? '#FF2727' : 'inherit'}>
          {value === 12 ? 'Full' : value}
        </Typography>
      ),
      width: 120,
      align: 'center',
    },
  ];

  return (
    <Box my="30px">
      <AntTable
        dataSource={dataSource}
        columns={columns}
        rowKey={(r) => r.id}
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
