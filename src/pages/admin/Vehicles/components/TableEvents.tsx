import { Box, Dialog, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import dayjs from 'dayjs';
import { memo, useState, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 } from 'uuid';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { VehicleEvent } from 'services/models/Vehicle';
import { RECORDS_PER_PAGE } from 'services/Vehicle/Company/getVehicleEvents';
import { selectVehicleEvents } from 'store/vehicles/selectors';
import { vehicleEventsActions } from 'store/vehicles/vehicleEventsSlice';
import { useToastStyle } from 'theme/toastStyles';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { getAppLengthSymbol } from 'utils/getAppLengthSymbol';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import { useStyles } from '../styles';
import { selectAuth } from 'store/auth/selectors';

function TableEvents() {
  const classes = useStyles();
  const toastClass = useToastStyle();
  const { t } = useTranslation(['vehicles', 'translation']);
  const [openDeleteVehicleEvent, setOpenDeleteVehicleEvent] = useState<VehicleEvent | null>(null);

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetVehicleEvents, vehicleEvents, currentPage, totalRows, queueDeleteVehicleEvent, currentSearcher } =
    useAppSelector(selectVehicleEvents);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  const { vehicleId } = useParams();

  const handleOpenDialogDelete = (record: VehicleEvent) => {
    setOpenDeleteVehicleEvent(record);
  };

  const handleCloseDialogDelete = () => {
    setOpenDeleteVehicleEvent(null);
  };

  const isAgent = userInfo?.role === 'agent';

  const columns: ColumnsType<VehicleEvent> = useMemo(() => {
    return [
      {
        key: 'index',
        dataIndex: 'index',
        title: () => t('vehicles:order'),
        render: (_value, _row, index) => (
          <Typography variant="body2" sx={{ cursor: 'pointer' }}>
            {index + 1}
          </Typography>
        ),
        width: 70,
        align: 'center',
      },
      {
        key: 'totalKilometers',
        dataIndex: 'totalKilometers',
        title: () => `${t('vehicles:totalKilometers')} (${getAppLengthSymbol({ isPlural: true, isCapitalize: true })})`,
        render: (_, row) => <Typography variant="body2">{row.totalKilometers}</Typography>,
        width: 144,
        align: 'center',
      },
      {
        key: 'fuelFees',
        dataIndex: 'fuelFees',
        title: () => `${t('vehicles:fuelFees')} (${getAppCurrencySymbol()})`,
        render: (_, row) => <Typography variant="body2">{row.fuelFees}</Typography>,
        width: 111,
        align: 'center',
      },
      {
        key: 'extraFees',
        dataIndex: 'extraFees',
        title: () => `${t('vehicles:extraFees')} (${getAppCurrencySymbol()})`,
        render: (_, row) => <Typography variant="body2">{row.extraFees}</Typography>,
        width: 120,
        align: 'center',
      },
      {
        key: 'description',
        dataIndex: 'description',
        title: () => `${t('vehicles:description')}`,
        render: (_, row) => <Typography variant="body2">{row.description}</Typography>,
        width: 340,
      },
      {
        key: 'reminderDate',
        dataIndex: 'reminderDate',
        title: () => `${t('vehicles:date')}`,
        render: (_, row) => <Typography variant="body2">{dayjs(row.reminderDate).format('MM/DD/YYYY')}</Typography>,
        width: 135,
        align: 'center',
      },
      {
        key: 'attach_files',
        dataIndex: 'attach_files',
        title: () => `${t('vehicles:attach_files')}`,
        render: (_, row) => (
          // FIXME: Attach đang k có "name"
          <a className={classes.downloadButton} href={getUrlOfResource(row.attach)} download>
            {row.attach._id}
          </a>
        ),
        width: 135,
        align: 'center',
      },
      {
        key: 'action',
        title: () => t('translation:action'),
        render: (_, row) => (
          <ActionTable
            actions={[
              {
                id: v4(),
                label: 'edit',
                icon: <EditIcon />,
                onClick: () => {
                  navigate(isAgent ? `/agent/vehicles/${vehicleId}/update-event/${row._id}` : `/admin/vehicles/${vehicleId}/update-event/${row._id}`);
                },
              },
              {
                id: v4(),
                label: 'delete',
                icon: <DeleteIcon />,
                onClick: () => {
                  handleOpenDialogDelete(row);
                },
                color: '#FF2727',
              },
            ]}
            row={row}
          />
        ),
        align: 'center',
        width: 150,
      },
    ];
  }, [classes.downloadButton, isAgent, navigate, t, vehicleId]);

  const renderDialogDelete = () => {
    if (openDeleteVehicleEvent === null) {
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
              loading={queueDeleteVehicleEvent.includes(openDeleteVehicleEvent?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteVehicleEvent) {
                  dispatch(
                    vehicleEventsActions.deleteVehicleEventRequest({
                      id: openDeleteVehicleEvent._id,
                      onSuccess: () => {
                        toast(<ToastCustom type="success" text={t('translation:delete_type_success', { type: t('vehicles:event') })} />, {
                          className: toastClass.toastSuccess,
                        });
                        handleCloseDialogDelete();
                      },
                      onFailure: () => {
                        toast(<ToastCustom type="error" text={t('translation:delete_type_error', { type: t('vehicles:event') })} />, {
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

  if (!vehicleId) {
    return <Navigate to="/404" />;
  }

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetVehicleEvents === 'loading'}
        columns={columns}
        dataSource={vehicleEvents}
        rowKey={r => r._id}
        pagination={{
          total: totalRows,
          showLessItems: true,
          showSizeChanger: false,
          pageSize: RECORDS_PER_PAGE,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            vehicleEventsActions.getVehicleEventsRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
              vehicleId,
            }),
          );
        }}
      />
      {renderDialogDelete()}
    </Box>
  );
}
export default memo(TableEvents);
