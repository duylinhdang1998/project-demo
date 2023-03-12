import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import 'antd/lib/timeline/style/css';
import { MapPinIcon, StopCircleSvg } from 'assets';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import { ViewIcon } from 'components/SvgIcon/ViewIcon';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Route } from 'services/models/Route';
import { selectAuth } from 'store/auth/selectors';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 as uuid } from 'uuid';
import { DialogMultiStopTripDetail } from './DialogMultiStopTripDetail/DialogMultiStopTripDetail';
import ToolTipAddress from './ToolTipAddress';

function TableRoutes() {
  const { t } = useTranslation(['routers', 'translation']);
  const toastClass = useToastStyle();

  const navigate = useNavigate();

  const { userInfo } = useAppSelector(selectAuth);
  const { routes, statusGetRoutes, queueDeleteRoute, currentSearcher } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const [openDeleteRoute, setOpenDeleteRoute] = useState<Route | null>(null);
  const [openDetailRoute, setOpenDetailRoute] = useState<Route | null>(null);

  const handleOpenDialogDelete = (record: Route) => {
    setOpenDeleteRoute(record);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteRoute(null);
  };

  const handleOpenDialogDetail = (record: Route) => {
    setOpenDetailRoute(record);
  };
  const handleCloseDialogDetail = () => {
    setOpenDetailRoute(null);
  };

  const columns: ColumnsType<Route> = useMemo(() => {
    return [
      {
        key: '_id',
        dataIndex: '_id',
        // FIXME: Cột này hiển thị gì?
        title: () => <Typography variant="headerTable">{t('routers:id')}</Typography>,
        sorter: true,
        render: (_, row) => <Typography variant="body2">{row._id}</Typography>,
        width: 100,
        align: 'center',
      },
      {
        // FIXME: Key để sort là gì?
        key: 'route',
        dataIndex: 'route',
        title: () => <Typography variant="headerTable">{t('routers:route')}</Typography>,
        sorter: true,
        render: (_, row) => {
          const isMultipleStops = row.stopPoints.length > 1;
          if (isMultipleStops) {
            const firstStopPoint = row.stopPoints[0];
            const lastStopPoint = row.stopPoints[row.stopPoints.length - 1];
            return (
              <ToolTipAddress stopPoints={row.stopPoints}>
                <TextWithIcon text={firstStopPoint.stopPoint} icon={MapPinIcon} color="#2D9AFF" />
                <TextWithIcon
                  text={t('routers:quantity_addresses', {
                    quantity: row.stopPoints.length - 2,
                  })}
                  icon={StopCircleSvg}
                  color="#33CC7F"
                />
                <TextWithIcon text={lastStopPoint.stopPoint} icon={MapPinIcon} color="#2D9AFF" />
              </ToolTipAddress>
            );
          }
          return (
            <ToolTipAddress stopPoints={row.stopPoints}>
              {row.stopPoints.map((stopPoint, index) => {
                const isPrimary = index !== 1;
                if (isPrimary) {
                  return (
                    <TextWithIcon
                      key={stopPoint.stopCode}
                      text={stopPoint.stopPoint}
                      icon={isPrimary ? MapPinIcon : StopCircleSvg}
                      color={isPrimary ? '#2D9AFF' : '#33CC7F'}
                    />
                  );
                }
              })}
            </ToolTipAddress>
          );
        },
      },
      {
        key: 'departureTime',
        dataIndex: 'departureTime',
        title: () => <Typography variant="headerTable">{t('routers:departureTime')}</Typography>,
        sorter: true,
        render: (_, row) => <Typography variant="body2">{row.departureTime}</Typography>,
      },
      {
        // FIXME: Cái này đâu ra? Key sort là gì
        key: 'arrivalDuration',
        dataIndex: 'arrivalDuration',
        title: () => <Typography variant="headerTable">{t('routers:arrivalDuration')}</Typography>,
        sorter: true,
        // FIXME: Arrival time lấy đâu ra?
        render: (_, row) => <Typography variant="body2">{row.departureTime}</Typography>,
      },
      {
        // FIXME: Vehicle brand & key sort là gì?
        key: 'vehicle',
        dataIndex: 'vehicle',
        title: () => <Typography variant="headerTable">{t('routers:vehicle')}</Typography>,
        sorter: true,
        render: (_, row) => (
          <Box>
            <Typography variant="body2">{row.vehicle.brand}</Typography>
            <Typography variant="body2">{row.vehicle.registrationId}</Typography>
          </Box>
        ),
        align: 'center',
        width: 120,
      },
      {
        key: 'VIPseats',
        dataIndex: 'VIPseats',
        title: () => <Typography variant="headerTable">{t('routers:VIPseats')}</Typography>,
        // FIXME: Hiển thị cái gì?
        render: () => <Typography variant="body2">10</Typography>,
        width: 120,
        align: 'center',
      },
      {
        key: 'ECOseats',
        dataIndex: 'ECOseats',
        title: () => <Typography variant="headerTable">{t('routers:ECOseats')}</Typography>,
        render: () => (
          // FIXME: Hiển thị cái gì?
          <Typography variant="body2">10</Typography>
        ),
        width: 120,
        align: 'center',
      },
      {
        title: () => t('translation:action'),
        render: (_, row) => (
          <ActionTable
            actions={[
              {
                id: uuid(),
                label: 'detail',
                icon: <ViewIcon />,
                onClick: () => {
                  handleOpenDialogDetail(row);
                },
              },
              {
                id: uuid(),
                label: 'edit',
                icon: <EditIcon />,
                onClick: () => {
                  if (row.tripType === 'ONE_TRIP') {
                    navigate(`/admin/routers/update-oneway/${row._id}`);
                  } else {
                    navigate(`/admin/routers/update-multi/${row._id}`);
                  }
                },
              },
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
                onClick: () => {},
              },
              {
                id: uuid(),
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
        width: 80,
      },
    ];
  }, [navigate, t]);

  const renderDialogDelete = () => {
    if (openDeleteRoute === null) {
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
              loading={queueDeleteRoute.includes(openDeleteRoute?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteRoute) {
                  dispatch(
                    routesActions.deleteRouteRequest({
                      id: openDeleteRoute._id,
                      onSuccess: () => {
                        toast(<ToastCustom type="success" text={t('translation:delete_type_success', { type: t('routers:route') })} />, {
                          className: toastClass.toastSuccess,
                        });
                        handleCloseDialogDelete();
                      },
                      onFailure: () => {
                        toast(<ToastCustom type="error" text={t('translation:delete_type_error', { type: t('routers:route') })} />, {
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

  const renderDialogDetail = () => {
    if (openDetailRoute === null) {
      return null;
    }
    return <DialogMultiStopTripDetail onClose={handleCloseDialogDetail} route={openDetailRoute} />;
  };

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetRoutes === 'loading'}
        columns={userInfo?.role === 'admin' ? columns : columns.slice(0, -1)}
        rowKey={r => r._id}
        dataSource={routes}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            routesActions.getRoutesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
      {renderDialogDelete()}
      {renderDialogDetail()}
    </Box>
  );
}

export default memo(TableRoutes);
