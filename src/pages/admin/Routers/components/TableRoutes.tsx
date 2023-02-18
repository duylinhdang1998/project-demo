import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Box, Dialog, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/lib/table';
import { memo, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import { MapPinIcon, StopCircleSvg } from 'assets';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Route } from 'services/models/Route';
import { selectAuth } from 'store/auth/selectors';
import { routesActions } from 'store/routes/routesSlice';
import { selectRoutes } from 'store/routes/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import ToolTipAddress from './ToolTipAddress';

function TableRoutes() {
  const { t } = useTranslation(['routers', 'translation']);
  const toastClass = useToastStyle();

  const navigate = useNavigate();

  const { userInfo } = useAppSelector(selectAuth);
  const { routes, statusGetRoutes, queueDeleteRoute, currentSearcher } = useAppSelector(selectRoutes);
  const dispatch = useAppDispatch();

  const [openDeleteRoute, setOpenDeleteRoute] = useState<Route | null>(null);

  const handleOpenDialogDelete = (record: Route) => {
    setOpenDeleteRoute(record);
  };

  const handleCloseDialogDelete = () => {
    setOpenDeleteRoute(null);
  };

  const columns: ColumnsType<Route> = useMemo(() => {
    return [
      {
        key: '_id',
        dataIndex: '_id',
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
          return (
            // FIXME: Sửa sao cho giống design
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
        title: () => <Typography variant="headerTable">{t('routers:departure_time')}</Typography>,
        sorter: true,
        render: (_, row) => <Typography variant="body2">{row.departureTime}</Typography>,
      },
      {
        // FIXME: Cái này đâu ra? Key sort là gì
        key: 'arrivalTime',
        dataIndex: 'arrivalTime',
        title: () => <Typography variant="headerTable">{t('routers:arrival_time')}</Typography>,
        sorter: true,
        // FIXME: Arrival time lấy đâu ra?
        render: (_, row) => <Typography variant="body2">{row.departureTime}</Typography>,
      },
      {
        // FIXME: key sort là gì?
        key: 'vehicle',
        dataIndex: 'vehicle',
        title: () => <Typography variant="headerTable">{t('routers:vehicle')}</Typography>,
        sorter: true,
        render: (_, row) => (
          <Box>
            <Typography variant="body2">{row.vehicle}</Typography>
            {/* FIXME: Vehicle brand chăng? */}
            <Typography variant="body2">{row.vehicle}</Typography>
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
                label: 'edit',
                icon: <EditIcon />,
                onClick: () => {
                  if (row.routeType === 'ONE_TRIP') {
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

  useEffect(() => {
    dispatch(
      routesActions.getRoutesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
                        toast(<ToastCustom type="success" text={t('routers:route_deleted')} />, {
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
    </Box>
  );
}

export default memo(TableRoutes);
