import ClearIcon from '@mui/icons-material/Clear';
import { Box, Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { ColumnsType } from 'antd/es/table';
import { Fragment, memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { v4 as uuid } from 'uuid';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { Office } from 'services/models/Office';
import { RECORDS_PER_PAGE } from 'services/OfficesManager/Company/getOffices';
import { officesManagerActions } from 'store/officesManager/officesManagerSlice';
import { selectOfficesManager } from 'store/officesManager/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';

const PROPERTIES_IN_DIALOG: Array<keyof Pick<Office, 'address' | 'zipCode' | 'city' | 'country'>> = ['address', 'zipCode', 'city', 'country'];

function TableOfficesManager() {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['account', 'translation', 'destinations']);
  const [openOfficeDetail, setOpenOfficeDetail] = useState<Office | null>(null);
  const [openDeleteOffice, setOpenDeleteOffice] = useState<Office | null>(null);
  const { statusGetOffices, offices, currentPage, totalRows, queueDeleteOffice, currentSearcher } = useAppSelector(selectOfficesManager);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOpenDialogDetail = (record: Office) => {
    setOpenOfficeDetail(record);
  };
  const handleOpenDialogDelete = (record: Office) => {
    setOpenDeleteOffice(record);
  };

  const handleCloseDialogDetail = () => {
    setOpenOfficeDetail(null);
  };

  const handleCloseDialogDelete = () => {
    setOpenDeleteOffice(null);
  };

  const columns: ColumnsType<Office> = useMemo(() => {
    return [
      {
        key: 'title',
        dataIndex: 'title',
        title: () => t('account:title'),
        render: (value, record) => (
          <Typography
            variant="body2"
            sx={{ cursor: 'pointer' }}
            onClick={() => {
              handleOpenDialogDetail(record);
            }}
          >
            {value}
          </Typography>
        ),
        sorter: () => 0,
        width: 200,
      },
      {
        key: 'address',
        dataIndex: 'address',
        title: () => t('account:address'),
        render: (value: string) => <Typography variant="body2">{value}</Typography>,
        align: 'left',
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
                  navigate(`/account/offices-manager/${row._id}`);
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
        width: 150,
      },
    ];
  }, [navigate, t]);

  const renderDialogDelete = () => {
    if (openDeleteOffice === null) {
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
              loading={queueDeleteOffice.includes(openDeleteOffice?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteOffice) {
                  dispatch(
                    officesManagerActions.deleteOfficeRequest({
                      id: openDeleteOffice._id,
                      onSuccess: () => {
                        toast(<ToastCustom type="success" text={t('translation:delete_type_success', { type: t('account:office') })} />, {
                          className: toastClass.toastSuccess,
                        });
                        handleCloseDialogDelete();
                      },
                      onFailure: () => {
                        toast(<ToastCustom type="error" text={t('translation:delete_type_error', { type: t('account:office') })} />, {
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
    if (openOfficeDetail === null) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogDetail}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{openOfficeDetail?.title}</DialogTitle>
            <IconButton onClick={handleCloseDialogDetail}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            {openOfficeDetail &&
              PROPERTIES_IN_DIALOG.map(property => (
                <Fragment key={property}>
                  <Grid item xs={3}>
                    <Typography variant="body2">{t(`destinations:${property}`)}:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{openOfficeDetail[property]}</Typography>
                  </Grid>
                </Fragment>
              ))}
          </Grid>
        </Box>
      </Dialog>
    );
  };

  return (
    <Box my="24px">
      <AntTable
        loading={statusGetOffices === 'loading'}
        columns={columns}
        dataSource={offices}
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
            officesManagerActions.getOfficesRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
      {renderDialogDetail()}
      {renderDialogDelete()}
    </Box>
  );
}

export default memo(TableOfficesManager);
