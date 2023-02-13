import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import ActionTable, { ActionItem } from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import EditIcon from 'components/SvgIcon/EditIcon';
import { useAppSelector } from 'hooks/useAppSelector';
import { PassengerTypeColumn } from 'models/Passenger';
import { Key, memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { v4 as uuid } from 'uuid';

const dataSource: PassengerTypeColumn[] = [];

for (let i = 0; i < 30; i++) {
  dataSource.push({
    id: uuid(),
    email: 'sklouche@yahoo.com',
    lastName: 'Payoun',
    firstName: 'Samia',
    mobile: '0123456789',
    total_order: i + 1,
  });
}

interface TablePassengerProps {
  onSelect?: (selected: PassengerTypeColumn[]) => void;
}

function TablePassenger({ onSelect }: TablePassengerProps) {
  const { t } = useTranslation(['passenger', 'translation']);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const { userInfo } = useAppSelector(selectAuth);
  const isAgent = userInfo?.role === 'agent';
  const route = isAgent ? '/agent/passengers/' : '/admin/passengers/';

  const handleCancel = () => setOpen(true);
  const handleClose = () => setOpen;
  const handleRow = (row: PassengerTypeColumn) => () => {
    navigate(route + row.id, { state: { isEdit: false } });
  };

  const handleEdit = (row: PassengerTypeColumn) => {
    navigate(route + row?.id, { state: { isEdit: true } });
  };

  const actions: ActionItem<PassengerTypeColumn>[] = [
    { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: handleEdit },
    {
      id: uuid(),
      label: 'block',
      icon: <RemoveCircleOutlineIcon sx={{ color: '#FF2727' }} />,
      onClick: handleCancel,
      color: '#FF2727',
    },
  ];

  const columns: ColumnsType<PassengerTypeColumn> = [
    {
      key: 'lastName',
      dataIndex: 'lastName',
      title: () => t('translation:lastName'),
      render: (val: string, row: PassengerTypeColumn) => (
        <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={handleRow(row)}>
          {val}
        </Typography>
      ),
      align: 'center',
      sorter: (a, b) => (a.lastName ?? '' > (b.lastName ?? '') ? 1 : -1),
    },
    {
      key: 'firstName',
      dataIndex: 'firstName',
      title: () => t('translation:firstName'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => (a.firstName ?? '' > (b.firstName ?? '') ? 1 : -1),
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: () => t('mobile'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
    },
    {
      key: 'email',
      dataIndex: 'email',
      title: () => t('email'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => (a.email ?? '' > (b.email ?? '') ? 1 : -1),
    },
    {
      key: 'total_order',
      dataIndex: 'total_order',
      title: () => t('total_order'),
      render: (val: number) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => a.total_order - b.total_order,
    },
    {
      key: 'action',
      title: () => t('translation:action'),
      render: (val, row) => {
        return <ActionTable actions={actions} row={row} />;
      },
      align: 'center',
      width: 100,
    },
  ];
  return (
    <Box my="24px">
      <AntTable
        rowSelection={{
          type: 'checkbox',
          onChange: (selectedRowKeys: Key[], selectedRows: PassengerTypeColumn[]) => onSelect?.(selectedRows),
        }}
        columns={columns}
        dataSource={dataSource}
        rowKey={(record) => record.id}
      />
      <DialogConfirm openDialog={open} title={t('passengers.block')} subTitle={t('passengers.block_message')} onClose={handleClose} />
    </Box>
  );
}

export default memo(TablePassenger);
