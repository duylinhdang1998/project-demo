import { Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/lib/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import { PackageSetting } from 'models/Package';
import React, { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const dataSource: PackageSetting[] = [];

for (let i = 0; i < 10; i++) {
  dataSource.push({
    id: uuid(),
    title: 'Package 2kg',
    description: 'Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.',
  });
}

function TablePackageSettings() {
  const { t } = useTranslation('packageSettings');
  const handleEdit = () => {
    console.log('edit');
  };

  const handleDelete = () => {};
  const actions = [
    { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: handleEdit },
    { id: uuid(), label: 'delete', icon: <DeleteIcon />, onClick: handleDelete, color: '#FF2727' },
  ];
  const columns: ColumnsType<PackageSetting> = [
    {
      key: 'title',
      title: () => t('title'),
      dataIndex: 'title',
      render: (value: string) => <Typography fontSize={14}>{value}</Typography>,
      sorter: (a, b) => (a.title ?? '' > (b.title ?? '') ? 1 : -1),
      width: 250,
    },
    {
      key: 'description',
      title: () => t('descriptions'),
      dataIndex: 'description',
      render: (value: string) => <Typography fontSize={14}>{value}</Typography>,
      width: 700,
    },
    {
      key: 'action',
      title: () => t('translation:action'),
      render: (_, row) => <ActionTable actions={actions} row={row} />,
      width: 80,
    },
  ];
  return (
    <Box my="24px">
      <AntTable columns={columns} dataSource={dataSource} rowKey={(r) => r.id} />
    </Box>
  );
}

export default memo(TablePackageSettings);
