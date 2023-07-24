import { Dialog, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import { labelOfRole } from 'components/SelectDecouplingData/SelectRole';
import CalendarIcon from 'components/SvgIcon/CalendarIcon';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Staff } from 'services/models/Staff';
import { RECORDS_PER_PAGE } from 'services/Staff/Company/getStaffs';
import { selectStaffs } from 'store/staffs/selectors';
import { staffsActions } from 'store/staffs/staffsSlice';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 as uuid } from 'uuid';

function TableStaff() {
  const { t } = useTranslation(['staff', 'translation']);

  const [openDeleteStaff, setOpenDeleteStaff] = useState<Staff | null>(null);

  const { statusGetStaffs, staffs, currentPage, totalRows, queueDeleteStaff, currentSearcher } = useAppSelector(selectStaffs);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOpenDialogDelete = (record: Staff) => {
    setOpenDeleteStaff(record);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteStaff(null);
  };

  const columns: ColumnsType<Staff> = useMemo(() => {
    return [
      {
        key: 'role',
        dataIndex: 'role',
        title: () => t('role'),
        align: 'center',
        render: (_, row) => <Typography variant="body2">{labelOfRole[row.role]}</Typography>,
        sorter: () => 0,
        width: 100,
      },
      {
        key: 'lastName',
        dataIndex: 'lastName',
        title: () => t('lastName'),
        render: (_, row) => (
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {row.lastName}
          </Typography>
        ),
        align: 'center',
        sorter: () => 0,
        width: 150,
      },
      {
        key: 'firstName',
        dataIndex: 'firstName',
        title: () => t('firstName'),
        render: (_, row) => (
          <Typography
            variant="body2"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {row.firstName}
          </Typography>
        ),
        align: 'center',
        sorter: () => 0,
        width: 150,
      },
      {
        key: 'phone',
        dataIndex: 'phone',
        title: () => t('phone'),
        render: (_, row) => <Typography variant="body2">{row.phone}</Typography>,
        align: 'center',
        width: 100,
      },
      {
        key: 'office',
        dataIndex: 'office',
        title: () => t('office_title'),
        render: (_, row) => (
          <Typography
            variant="body2"
            sx={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {row.office?.title}
          </Typography>
        ),
        align: 'center',
        width: 300,
      },
      {
        key: 'action',
        title: () => t('translation:action'),
        render: (_, row) => (
          <ActionTable
            actions={[
              {
                id: uuid(),
                label: 'edit',
                icon: <EditIcon />,
                onClick: () => {
                  navigate(`/admin/staffs/${row._id}`);
                },
              },
              {
                id: uuid(),
                label: 'schedule',
                icon: <CalendarIcon />,
                onClick: () => {
                  navigate(`/admin/staffs/${row._id}`, {
                    state: {
                      isConsultSchedule: true,
                    },
                  });
                },
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
        align: 'center',
        width: 100,
      },
    ];
  }, [navigate, t]);

  const renderDialogDelete = () => {
    if (openDeleteStaff === null) {
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
              loading={queueDeleteStaff.includes(openDeleteStaff?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteStaff) {
                  dispatch(
                    staffsActions.deleteStaffRequest({
                      id: openDeleteStaff._id,
                      onSuccess: () => {
                        toast(
                          <ToastCustom
                            type="success"
                            text={t('translation:delete_type_success', {
                              type: t('staff:staff').toLowerCase(),
                            })}
                          />,
                          { className: 'toast-success' },
                        );
                        handleCloseDialogDelete();
                      },
                      onFailure: message => {
                        toast(
                          <ToastCustom
                            type="error"
                            text={t('translation:delete_type_error', {
                              type: t('staff:staff').toLowerCase(),
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
        loading={statusGetStaffs === 'loading'}
        columns={columns}
        dataSource={staffs}
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
            staffsActions.getStaffsRequest({
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

export default memo(TableStaff);
