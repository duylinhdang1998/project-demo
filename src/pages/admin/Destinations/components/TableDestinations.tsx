import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import ActionTable, { ActionItem } from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import { DestinationsColumnType } from 'models/Destinations';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { v4 as uuid } from 'uuid';

const dataSource: DestinationsColumnType[] = [];
for (let i = 0; i < 15; i++) {
  dataSource.push({
    id: uuid(),
    title: 'Lyon',
    address: 'Address, zipcode, city, country',
  });
}

const dataDetails = {
  address: '14 Cr de Verdun Gensoul, 69002 Lyon, France',
  zip_code: '69000',
  city: 'Lyon',
  country: 'france',
};

export default function TableDestinations() {
  const { t } = useTranslation(['destinations', 'translation']);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions: ActionItem<DestinationsColumnType>[] = [
    { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: () => {} },
    { id: uuid(), label: 'delete', icon: <DeleteIcon />, onClick: () => {}, color: '#FF2727' },
  ];

  const columns: ColumnsType<DestinationsColumnType> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: () => t('title'),
      render: (value: string) => (
        <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={handleClickOpen}>
          {value}
        </Typography>
      ),
      sorter: (a, b) => (a.title ?? '' > (b.title ?? '') ? 1 : -1),
      width: 200,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: () => t('address'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      align: 'left',
    },
    {
      key: 'action',
      title: () => t('translation:action'),
      render: (_, row) => <ActionTable actions={actions} row={row} />,
      align: 'center',
      width: 150,
    },
  ];

  return (
    <Box my="24px">
      <AntTable columns={columns} dataSource={dataSource} rowKey={(r) => r.id} />
      <Dialog open={open} onClose={handleClose}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>Lyon Gare Perrache</DialogTitle>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            {Object.keys(dataDetails).map((i) => (
              <React.Fragment key={i}>
                <Grid item xs={3}>
                  <Typography variant="body2">{t(`${i}`)}:</Typography>
                </Grid>
                <Grid item xs={9}>
                  <Typography variant="body2">{dataDetails[i]}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Box>
      </Dialog>
    </Box>
  );
}
