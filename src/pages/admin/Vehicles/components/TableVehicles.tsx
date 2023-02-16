import { Dialog, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import AlertIcon from 'assets/images/alert-circle.svg';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import BookmarkIcon from 'components/SvgIcon/BookmarkIcon';
import CirclePlusIcon from 'components/SvgIcon/CirclePlusIcon';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Vehicle } from 'services/models/Vehicle';
import { RECORDS_PER_PAGE } from 'services/Vehicle/Company/getVehicles';
import { selectAuth } from 'store/auth/selectors';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import { useToastStyle } from 'theme/toastStyles';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';

const useStyles = makeStyles(() => ({
  iconAlert: {
    width: 32,
    height: 32,
  },
}));

function TableVehicles() {
  const toastClass = useToastStyle();
  const classes = useStyles();
  const { t } = useTranslation(['vehicles', 'translation']);
  const navigate = useNavigate();

  const [openDeleteVehicle, setOpenDeleteVehicle] = useState<Vehicle | null>(null);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetVehicles, queueDeleteVehicle, vehicles, currentPage, currentSearcher, totalRows } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const isAgent = useMemo(() => userInfo?.role === 'agent', [userInfo]);

  const handleOpenDialogDelete = (record: Vehicle) => {
    setOpenDeleteVehicle(record);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteVehicle(null);
  };

  const columns: ColumnsType<Vehicle> = useMemo(() => {
    return [
      {
        key: 'brand', // Cột này sort theo key "brand"
        dataIndex: 'brand',
        title: () => t('vehicles:vehicle'),
        align: 'center',
        render: (_, record) => (
          <Box display="flex" alignItems="center">
            <Box mx="5px">
              {/* FIXME: Cái này có phải 1 trường của request k hay FE fix cứng? */}
              <img src={AlertIcon} className={classes.iconAlert} alt="" />
            </Box>
            <Box mx="5px">
              <Typography variant="body2">
                {record.brand} - {record.model}
              </Typography>
              {/* FIXME: "250 000kms" ở đâu ra? */}
              <Typography variant="body2">250 000 kms</Typography>
            </Box>
          </Box>
        ),
        sorter: () => 0,
      },
      {
        key: 'registrationId',
        dataIndex: 'registrationId',
        title: () => t('vehicles:registrationId'),
        render: (_, record) => <Typography variant="body2">{record.registrationId}</Typography>,
        align: 'center',
      },
      {
        key: 'ECOseats',
        dataIndex: 'ECOseats',
        title: () => t('vehicles:ECOseats'),
        render: (_, record) => <Typography variant="body2">{record.ECOseats}</Typography>,
        align: 'center',
        sorter: true,
      },
      {
        key: 'VIPseats',
        dataIndex: 'VIPseats',
        title: () => t('vehicles:VIPseats'),
        render: (_, record) => <Typography variant="body2">{record.VIPseats}</Typography>,
        align: 'center',
        sorter: true,
      },
      {
        key: 'routeId',
        dataIndex: 'routeId',
        title: () => t('vehicles:routeId'),
        // FIXME: routeId chưa có
        render: _ => <Typography variant="body2">Route ID</Typography>,
        align: 'center',
      },
      {
        key: 'action',
        title: () => t('translation:action'),
        render: (_, row) => (
          <ActionTable
            actions={[
              {
                ...(!isAgent
                  ? {
                      id: uuid(),
                      label: 'edit',
                      icon: <EditIcon />,
                      onClick: () => {
                        navigate(`/admin/vehicles/${row._id}`);
                      },
                    }
                  : {}),
              },
              {
                id: uuid(),
                label: 'add_new_event',
                icon: <CirclePlusIcon />,
                onClick: () => {
                  navigate(isAgent ? `/agent/${row._id}/add-new-event` : `/admin/${row._id}/add-new-event`);
                },
              },
              {
                id: uuid(),
                label: 'show_event_lists',
                icon: <BookmarkIcon />,
                onClick: () => {
                  navigate(isAgent ? `/agent/${row._id}/list-events` : `/admin/${row._id}/list-events`);
                },
              },
              {
                ...(!isAgent
                  ? {
                      id: uuid(),
                      label: 'delete',
                      icon: <DeleteIcon />,
                      onClick: () => {
                        handleOpenDialogDelete(row);
                      },
                      color: '#FF2727',
                    }
                  : {}),
              },
            ].filter(i => !isEmpty(i))}
            row={row}
          />
        ),
        align: 'center',
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const renderDialogDelete = () => {
    if (openDeleteVehicle === null) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogDelete}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {t('translation:delete_record_title')}
          </Typography>
          <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
            {t('translation:delete_record_message')}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{
                margin: '0 6px',
                color: '#1AA6EE',
                padding: '10px 40px',
              }}
              onClick={handleCloseDialogDelete}
            >
              {t('translation:cancel')}
            </Button>
            <Button
              loading={queueDeleteVehicle.includes(openDeleteVehicle?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteVehicle) {
                  dispatch(
                    vehiclesActions.deleteVehicleRequest({
                      id: openDeleteVehicle._id,
                      onSuccess: () => {
                        toast(<ToastCustom type="success" text={t('vehicles:vehicle_deleted')} />, {
                          className: toastClass.toastSuccess,
                        });
                        handleCloseDialogDelete();
                      },
                      onFailure: () => {
                        toast(<ToastCustom type="error" text={t('translation:internal_server_error')} />, {
                          className: toastClass.toastError,
                        });
                      },
                    }),
                  );
                }
              }}
            >
              {t('translation:delete')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetVehicles === 'loading'}
        columns={columns}
        dataSource={vehicles}
        rowKey={r => r._id}
        pagination={{ total: totalRows, pageSize: RECORDS_PER_PAGE, current: currentPage + 1 }}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            vehiclesActions.getVehiclesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
      {renderDialogDelete()}
    </Box>
  );
}

export default memo(TableVehicles);
