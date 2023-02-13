import TvIcon from '@mui/icons-material/Tv';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';
import AntTable from 'components/AntTable/AntTable';
import { Service } from 'models/Services';
import ActionService from './ActionService';

const dataSource: Service[] = [
  { id: uuid(), icon: 'wifi', title: 'Wifi' },
  { id: uuid(), icon: 'wifi', title: 'Waters' },
  { id: uuid(), icon: 'wifi', title: 'Televisions' },
];

function TableServices() {
  const { t } = useTranslation('serviceSetting');
  const columns: ColumnsType<Service> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: () => t('service_title'),
      render: (value: string) => (
        <Typography fontSize={14} color="#0C1132">
          {value}
        </Typography>
      ),
      sorter: (a, b) => (a.title ?? '' > (b.title ?? '') ? 1 : -1),
    },
    {
      key: 'icon',
      dataIndex: 'icon',
      title: () => t('service_icon'),
      render: () => <TvIcon />,
      align: 'center',
    },
    {
      key: 'action',
      title: () => t('service_action'),
      render: () => <ActionService />,
      align: 'center',
    },
  ];
  return (
    <Box my="24px">
      <AntTable columns={columns} dataSource={dataSource} rowKey={r => r.id} />
    </Box>
  );
}

export default memo(TableServices);
