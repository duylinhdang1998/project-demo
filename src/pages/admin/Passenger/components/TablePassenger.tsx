import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import { Dialog, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Passenger } from 'services/models/Passenger';
import { RECORDS_PER_PAGE } from 'services/Passenger/getPassengers';
import { selectAuth } from 'store/auth/selectors';
import { passengersActions } from 'store/passengers/passengersSlice';
import { selectPassengers } from 'store/passengers/selectors';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 } from 'uuid';

interface TablePassengerProps {
  onSelect?: (selected: Passenger[]) => void;
  selectedPassengers: Passenger[];
}

const passengerIsBlocking = (passenger: Passenger) => passenger.status === 'BLOCK';

function TablePassenger({ onSelect, selectedPassengers }: TablePassengerProps) {
  const { t } = useTranslation(['passenger', 'translation']);

  const [openDialogConfirmBlock, setOpenDialogConfirmBlock] = useState<Passenger | null>(null);

  const { statusGetPassengers, queueUpdatePassenger, passengers, totalRows, currentPage, currentSearcher } = useAppSelector(selectPassengers);
  const { userInfo } = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const isAgent = userInfo?.role === 'agent';
  const route = isAgent ? '/agent/passengers/' : '/admin/passengers/';

  const handleOpenDialogConfirmBlock = (record: Passenger) => {
    setOpenDialogConfirmBlock(record);
  };
  const handleCloseDialogConfirmBlock = () => {
    setOpenDialogConfirmBlock(null);
  };

  const columns: ColumnsType<Passenger> = useMemo(() => {
    return [
      {
        key: 'lastName',
        dataIndex: 'lastName',
        title: () => t('translation:lastName'),
        render: (_, row) => (
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              navigate(route + row._id);
            }}
          >
            {row.lastName}
          </Typography>
        ),
        align: 'center',
        sorter: () => 0,
      },
      {
        key: 'firstName',
        dataIndex: 'firstName',
        title: () => t('translation:firstName'),
        render: (_, row) => <Typography variant="body2">{row.firstName}</Typography>,
        align: 'center',
        sorter: () => 0,
      },
      {
        key: 'phone',
        dataIndex: 'phone',
        title: () => t('passenger:phone'),
        render: (_, row) => <Typography variant="body2">{row.phone}</Typography>,
        align: 'center',
      },
      {
        key: 'email',
        dataIndex: 'email',
        title: () => t('passenger:email'),
        render: (_, row) => <Typography variant="body2">{row.email}</Typography>,
        align: 'center',
        sorter: () => 0,
      },
      {
        key: 'orderCounts',
        dataIndex: 'orderCounts',
        title: () => t('passenger:orderCounts'),
        render: (_, row) => <Typography variant="body2">{row.orderCounts}</Typography>,
        align: 'center',
        sorter: () => 0,
      },
      {
        key: 'action',
        title: () => t('translation:action'),
        render: (_, row) => {
          return (
            <ActionTable
              actions={[
                {
                  id: v4(),
                  label: t('translation:edit'),
                  icon: <EditIcon />,
                  onClick: () => {
                    navigate(route + row._id, {
                      state: { isEdit: true },
                    });
                  },
                },
                {
                  id: v4(),
                  label: passengerIsBlocking(row) ? t('passenger:unblock') : t('passenger:block'),
                  icon: <RemoveCircleOutlineIcon sx={{ color: '#FF2727' }} />,
                  onClick: handleOpenDialogConfirmBlock,
                  color: '#FF2727',
                },
              ]}
              row={row}
            />
          );
        },
        align: 'center',
        width: 100,
      },
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [t]);

  const renderDialogConfirmBlock = () => {
    if (openDialogConfirmBlock === null) {
      return null;
    }
    const isBlocking = passengerIsBlocking(openDialogConfirmBlock);
    return (
      <Dialog open onClose={handleCloseDialogConfirmBlock}>
        <Box padding="24px" style={{ maxWidth: 311, textAlign: 'center' }}>
          <Typography marginBottom="24px" fontSize="16px" fontWeight={700}>
            {isBlocking ? t('passenger:unblock_title') : t('passenger:block_title')}
          </Typography>
          <Typography marginBottom="30px" fontSize="14px" fontWeight={400}>
            {isBlocking ? t('passenger:unblock_message') : t('passenger:block_message')}
          </Typography>
          <Stack direction="row" alignItems="center">
            <Button
              variant="outlined"
              sx={{
                marginRight: '12px',
                color: '#1AA6EE',
                padding: '10px 40px',
                flex: 1,
              }}
              onClick={handleCloseDialogConfirmBlock}
            >
              {t('translation:no')}
            </Button>
            <Button
              loading={queueUpdatePassenger.includes(openDialogConfirmBlock._id)}
              sx={{
                color: '#FFFFFF',
                padding: '10px 40px',
                flex: 1,
              }}
              backgroundButton="rgba(26, 166, 238, 1)"
              onClick={() => {
                if (openDialogConfirmBlock) {
                  dispatch(
                    passengersActions.updateStatusPassengerRequest({
                      id: openDialogConfirmBlock._id,
                      passenger: openDialogConfirmBlock,
                      data: {
                        status: isBlocking ? 'ACTIVE' : 'BLOCK',
                      },
                      onSuccess: () => {
                        toast(
                          <ToastCustom
                            type="success"
                            text={t('translation:edit_type_success', {
                              type: t('passenger:passenger').toLowerCase(),
                            })}
                          />,
                          { className: 'toast-success' },
                        );
                        handleCloseDialogConfirmBlock();
                      },
                      onFailure: message => {
                        toast(
                          <ToastCustom
                            type="error"
                            text={t('translation:edit_type_error', {
                              type: t('passenger:passenger').toLowerCase(),
                            })}
                            description={message}
                          />,
                          { className: 'toast-error' },
                        );
                      },
                    }),
                  );
                }
              }}
            >
              {t('translation:yes')}
            </Button>
          </Stack>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetPassengers === 'loading'}
        columns={columns}
        dataSource={passengers}
        rowKey={record => record._id}
        pagination={{
          total: totalRows,
          showLessItems: true,
          showSizeChanger: false,
          pageSize: RECORDS_PER_PAGE,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          dispatch(
            passengersActions.getPassengersRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
        rowSelection={{
          type: 'checkbox',
          onChange: (_, selectedRows) => onSelect?.(selectedRows),
          selectedRowKeys: selectedPassengers.map(item => item._id),
        }}
      />
      {renderDialogConfirmBlock()}
    </Box>
  );
}

export default memo(TablePassenger);
