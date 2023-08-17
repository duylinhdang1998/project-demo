import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import ActionTable, { ActionItem } from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import DialogConfirm from 'components/DialogConfirm/DialogConfirm';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useDeleteDestination } from 'services/Destinations/destinations';
import { Destination } from 'services/models/Destination';
import { ParamsSettings } from 'services/models/Response';
import { ServiceException } from 'services/utils/ServiceException';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 as uuid } from 'uuid';

interface Props {
  dataSource?: Destination[];
  isLoading?: boolean;
  pagination?: {
    totalRows?: number;
  };
  onFilter?: (params: ParamsSettings<Destination>) => void;
  onRefresh?: () => void;
  sortOrder?: 'ascend' | 'descend';
}

export default function TableDestinations({ dataSource = [], isLoading, pagination, onFilter, onRefresh, sortOrder }: Props) {
  const { t } = useTranslation(['destinations', 'translation']);
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [rowSelected, setRowSelected] = useState<Destination>();

  const [openDelete, setOpenDelete] = useState(false);

  const { run: deleteDestination, loading } = useDeleteDestination({
    onSuccess: data => {
      if (data.code === 0) {
        toast(<ToastCustom type="success" text={t('translation:delete_type_success', { type: t('destination').toLowerCase() })} />, {
          className: 'toast-success',
        });
        onRefresh?.();
        setOpenDelete(false);
      } else {
        toast(
          <ToastCustom
            type="error"
            text={t('translation: delete_type_error', { type: t('destination').toLowerCase() })}
            description={ServiceException.getMessageError(data.code)}
          />,
          {
            className: 'toast-error',
          },
        );
      }
    },
  });

  const handleClickOpen = (row: Destination) => () => {
    setRowSelected(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setOpenDelete(false);
  };

  const handleDelete = () => {
    deleteDestination(rowSelected?._id ?? '');
  };

  const removeKeyDetails = (key: string) => {
    const keys = ['_id', 'createdAt', 'updatedAt', '__v', 'title', 'company', 'status'];
    return keys.includes(key);
  };

  const actions: ActionItem<Destination>[] = [
    {
      id: uuid(),
      label: 'edit',
      icon: <EditIcon />,
      onClick: row => {
        navigate(`/admin/destination/${row?._id}`, {
          state: {
            destination: row,
          },
        });
      },
    },
    {
      id: uuid(),
      label: 'delete',
      icon: <DeleteIcon />,
      onClick: row => {
        setOpenDelete(true);
        setRowSelected(row);
      },
      color: '#FF2727',
    },
  ];

  const columns: ColumnsType<Destination> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: () => t('title'),
      render: (value: string, item) => (
        <Typography variant="body2" sx={{ cursor: 'pointer' }} onClick={handleClickOpen(item)}>
          {value}
        </Typography>
      ),
      sorter: () => 0,
      width: 200,
      sortOrder: !!sortOrder ? sortOrder : undefined,
    },
    {
      key: 'address',
      dataIndex: 'address',
      title: () => t('address'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      align: 'left',
    },
    {
      key: 'zipCode',
      dataIndex: 'zipCode',
      title: () => t('zipCode'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      align: 'left',
    },
    {
      key: 'city',
      dataIndex: 'city',
      title: () => t('city'),
      render: (value: string) => <Typography variant="body2">{value}</Typography>,
      align: 'left',
    },
    {
      key: 'country',
      dataIndex: 'country',
      title: () => t('country'),
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
      <AntTable
        columns={columns}
        dataSource={dataSource}
        rowKey={r => r._id}
        loading={isLoading}
        pagination={{
          pageSize: 10,
          total: pagination?.totalRows,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
          onFilter?.({ page: getPaginationFromAntdTable({ pagination, extra }), sorter: getSorterParamsFromAntdTable({ sorter }), searcher: {} });
        }}
      />
      <Dialog open={open} onClose={handleClose}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{rowSelected?.title}</DialogTitle>
            <IconButton onClick={handleClose}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            {!!rowSelected &&
              Object.keys(rowSelected).map(i =>
                removeKeyDetails(i) ? null : (
                  <Fragment key={i}>
                    <Grid item xs={3}>
                      <Typography variant="body2">{t(`${i}`)}:</Typography>
                    </Grid>
                    <Grid item xs={9}>
                      <Typography variant="body2">{rowSelected[i]}</Typography>
                    </Grid>
                  </Fragment>
                ),
              )}
          </Grid>
        </Box>
      </Dialog>

      <DialogConfirm
        openDialog={openDelete}
        title={t('translation:delete_type', { type: t('destination').toLowerCase() })}
        subTitle={t('translation:delete_destination')}
        onClose={handleClose}
        onOk={handleDelete}
        loading={loading}
      />
    </Box>
  );
}
