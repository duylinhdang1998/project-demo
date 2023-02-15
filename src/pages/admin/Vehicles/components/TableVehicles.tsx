import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import { isEmpty } from 'lodash';
import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { v4 as uuid } from 'uuid';
import AlertIcon from 'assets/images/alert-circle.svg';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import BookmarkIcon from 'components/SvgIcon/BookmarkIcon';
import CirclePlusIcon from 'components/SvgIcon/CirclePlusIcon';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Vehicle } from 'services/models/Vehicle';
import { RECORDS_PER_PAGE } from 'services/Vehicle/Company/getVehicles';
import { selectAuth } from 'store/auth/selectors';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';

const useStyles = makeStyles(() => ({
  iconAlert: {
    width: 32,
    height: 32,
  },
}));

function TableVehicles() {
  const classes = useStyles();
  const { t } = useTranslation(['vehicles', 'translation']);
  const navigate = useNavigate();

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetVehicles, vehicles, currentPage, currentSearcher, totalRows } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const isAgent = useMemo(() => userInfo?.role === 'agent', [userInfo]);

  const columns: ColumnsType<Vehicle> = useMemo(() => {
    return [
      {
        key: 'vehicle',
        dataIndex: 'vehicle',
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
                  navigate(isAgent ? '/agent/add-new-event' : '/admin/add-new-event');
                },
              },
              {
                id: uuid(),
                label: 'show_event_lists',
                icon: <BookmarkIcon />,
                onClick: () => {
                  navigate(isAgent ? '/agent/list-events' : '/admin/list-events');
                },
              },
              {
                ...(!isAgent
                  ? {
                      id: uuid(),
                      label: 'delete',
                      icon: <DeleteIcon />,
                      onClick: () => {},
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

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetVehicles === 'loading'}
        columns={columns}
        dataSource={vehicles}
        rowKey={r => r._id}
        pagination={{ total: totalRows, pageSize: RECORDS_PER_PAGE, current: currentPage + 1 }}
        onChange={(pagination, _, sorter, extra) => {
          // FIXME: Column "Vehicle" đang chưa biết sort theo trường nào. Nó kết hợp 3 field với nhau để tạo column này
          dispatch(
            vehiclesActions.getVehiclesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
    </Box>
  );
}

export default memo(TableVehicles);
