import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Typography } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import { MapPinIcon, StopCircleSvg } from 'assets';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { useAppSelector } from 'hooks/useAppSelector';
import { RoutePrograms } from 'models/RoutePrograms';
import { selectAuth } from 'store/auth/selectors';
import ToolTipAddress from './ToolTipAddress';

const dataSource: RoutePrograms[] = [];

for (let i = 0; i < 6; i++) {
  dataSource.push({
    id: i.toString(),
    route: ['Lyon Gare Perrache', '5 address', 'Lyon Gare Perrache'],
    departure_time: '02/27/2022 - 10H30',
    arrival_time: '02/27/2022 - 14H30',
    vehicle: 'Mercedes',
    VIPseats: i + 1,
    ECOseats: i + 1,
  });
}

function TableRoutes() {
  const { t } = useTranslation(['dashboard', 'translation']);
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);

  const handleEdit = (row: RoutePrograms) => {
    navigate('/admin/routers/edit/' + row.id, {
      state: {
        router: row,
        isMulti: true,
      },
    });
  };

  const handleDelete = () => {};
  const actions = [
    { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: handleEdit },
    {
      id: uuid(),
      label: 'copy',
      icon: (
        <ContentCopyIcon
          sx={{
            color: '#858C93',
            fontSize: '20px',
          }}
        />
      ),
      onClick: handleEdit,
    },
    {
      id: uuid(),
      label: 'delete',
      icon: <DeleteIcon />,
      onClick: handleDelete,
      color: '#FF2727',
    },
  ];

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
            <ToolTipAddress>
              <TextWithIcon text={v} key={index.toString()} icon={StopCircleSvg} color="#33CC7F" />
            </ToolTipAddress>
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
    {
      title: () => t('translation:action'),
      render: (_, row) => <ActionTable actions={actions} row={row} />,
      width: 80,
    },
  ];
  return (
    <Box my="24px">
      <AntTable columns={userInfo?.role === 'admin' ? columns : columns.slice(0, -1)} dataSource={dataSource} rowKey={r => r.id} />
    </Box>
  );
}

export default memo(TableRoutes);
