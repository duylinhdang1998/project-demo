import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import CalendarIcon from 'components/SvgIcon/CalendarIcon';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';

const dataSource: StaffTableType[] = [];

for (let i = 0; i < 10; i++) {
  dataSource.push({
    id: uuid(),
    type: i % 2 === 0 ? 'Agent' : 'Admin',
    lastName: 'Payoun',
    firstName: 'Samia',
    mobile: '0123456789',
    office_title: 'Amet minim mollit non deserunt ullamco est sit amet.',
  });
}

function TableStaff() {
  const { t } = useTranslation(['staff', 'translation']);
  const navigate = useNavigate();

  const actions = [
    { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: () => {} },
    { id: uuid(), label: 'schedule', icon: <CalendarIcon />, onClick: () => {} },
    { id: uuid(), label: 'delete', icon: <DeleteIcon />, onClick: () => {}, color: '#FF2727' },
  ];

  const columns: ColumnsType<StaffTableType> = [
    {
      key: 'type',
      dataIndex: 'type',
      title: () => t('type'),
      align: 'center',
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      sorter: (a, b) => (a.type ?? '' > (b.type ?? '') ? 1 : -1),
      width: 100,
    },
    {
      key: 'lastName',
      dataIndex: 'lastName',
      title: () => t('lastName'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => (a.lastName ?? '' > (b.lastName ?? '') ? 1 : -1),
      width: 150,
    },
    {
      key: 'firstName',
      dataIndex: 'firstName',
      title: () => t('firstName'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => (a.firstName ?? '' > (b.firstName ?? '') ? 1 : -1),
      width: 150,
    },
    {
      key: 'mobile',
      dataIndex: 'mobile',
      title: () => t('mobile'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      width: 100,
    },
    {
      key: 'office_title',
      dataIndex: 'office_title',
      title: () => t('office_title'),
      render: (val: string) => <Typography variant="body2">{val}</Typography>,
      align: 'center',
      sorter: (a, b) => (a.office_title ?? '' > (b.office_title ?? '') ? 1 : -1),
      width: 300,
    },
    {
      key: 'action',
      title: () => t('translation:action'),
      render: (_, row) => <ActionTable actions={actions} row={row} />,
      align: 'center',
      width: 100,
    },
  ];
  return (
    <Box my="24px">
      <AntTable columns={columns} dataSource={dataSource} rowKey={(record) => record.id} />
    </Box>
  );
}

export default memo(TableStaff);
