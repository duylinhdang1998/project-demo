import AlertIcon from 'assets/images/alert-circle.svg';
import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import BookmarkIcon from 'components/SvgIcon/BookmarkIcon';
import CirclePlusIcon from 'components/SvgIcon/CirclePlusIcon';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import { useAppSelector } from 'hooks/useAppSelector';
import { isEmpty } from 'lodash';
import { VehicleColumn } from 'models/Vehicles';
import { memo, useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { selectAuth } from 'store/auth/selectors';
import { v4 as uuid } from 'uuid';
import { Vehicle } from 'services/models/Vehicle';
import { selectVehicles } from 'store/vehicles/selectors';
import { vehiclesActions } from 'store/vehicles/vehiclesSlice';
import { useAppDispatch } from 'hooks/useAppDispatch';

const useStyles = makeStyles(() => ({
  iconAlert: {
    width: 32,
    height: 32,
  },
}));

const dataSource: VehicleColumn[] = [];

for (let i = 0; i < 10; i++) {
  dataSource.push({
    id: uuid(),
    vehicle: 'Brand - Model',
    registration_id: 'DX727AM',
    eco_seats: 10,
    vip_seats: 12,
    route_id: '12',
  });
}

function TableVehicles() {
  const classes = useStyles();
  const { t } = useTranslation(['vehicles', 'translation']);
  const navigate = useNavigate();

  const { userInfo } = useAppSelector(selectAuth);
  const { statusGetVehicles, vehicles } = useAppSelector(selectVehicles);
  const dispatch = useAppDispatch();

  const isAgent = useMemo(() => userInfo?.role === 'agent', [userInfo]);

  const actions = useMemo(() => {
    return [
      {
        ...(!isAgent ? { id: uuid(), label: 'edit', icon: <EditIcon />, onClick: () => {} } : {}),
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
    ].filter((i) => !isEmpty(i));
  }, []);

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
        sorter: (a, b) => 0,
      },
      {
        key: 'registration_id',
        dataIndex: 'registration_id',
        title: () => t('vehicles:registration_id'),
        render: (_, record) => <Typography variant="body2">{record.registrationId}</Typography>,
        align: 'center',
      },
      {
        key: 'eco_seats',
        dataIndex: 'eco_seats',
        title: () => t('vehicles:eco_seats'),
        render: (_, record) => <Typography variant="body2">{record.ECOseats}</Typography>,
        align: 'center',
        sorter: true,
      },
      {
        key: 'vip_seats',
        dataIndex: 'vip_seats',
        title: () => t('vehicles:vip_seats'),
        render: (_, record) => <Typography variant="body2">{record.VIPseats}</Typography>,
        align: 'center',
        sorter: true,
      },
      {
        key: 'route_id',
        dataIndex: 'route_id',
        title: () => t('vehicles:route_id'),
        // FIXME: routeId chưa có
        render: (_, record) => <Typography variant="body2">{record._id}</Typography>,
        align: 'center',
      },
      {
        key: 'action',
        title: () => t('translation:action'),
        render: (_, row) => <ActionTable actions={actions} row={row} />,
        align: 'center',
      },
    ];
  }, [t]);

  useEffect(() => {
    dispatch(
      vehiclesActions.getVehiclesRequest({
        page: 0,
        searcher: {},
        sorter: {},
      }),
    );
  }, []);

  // FIXME: Retry screen
  if (statusGetVehicles === 'failure') {
    return (
      <button
        onClick={() => {
          dispatch(
            vehiclesActions.getVehiclesRequest({
              page: 0,
              searcher: {},
              sorter: {},
            }),
          );
        }}
      >
        Retry
      </button>
    );
  }

  return (
    <Box my="24px">
      <AntTable loading={statusGetVehicles === 'loading'} columns={columns} dataSource={vehicles} rowKey={(r) => r._id} />
    </Box>
  );
}

export default memo(TableVehicles);
