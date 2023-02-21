import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, DialogTitle, Divider, Grid, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/lib/table';
import { memo, useMemo, useState, Fragment } from 'react';
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
import { PackageSetting } from 'services/models/PackageSetting';
import { RECORDS_PER_PAGE } from 'services/PackageSettings/Company/getPackageSettings';
import { packageSettingsActions } from 'store/packageSettings/packageSettingsSlice';
import { selectPackageSettings } from 'store/packageSettings/selectors';
import { useToastStyle } from 'theme/toastStyles';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';

const PROPERTIES_IN_DIALOG: Array<keyof Pick<PackageSetting, 'title' | 'description'>> = ['title', 'description'];

function TablePackageSettings() {
  const toastClass = useToastStyle();
  const { t } = useTranslation(['packageSettings', 'translation']);
  const [openPackageSettingDetail, setOpenPackageSettingDetail] = useState<PackageSetting | null>(null);
  const [openDeletePackageSetting, setOpenDeletePackageSetting] = useState<PackageSetting | null>(null);

  const { statusGetPackageSettings, packageSettings, currentPage, totalRows, queueDeletePackageSetting, currentSearcher } =
    useAppSelector(selectPackageSettings);
  const dispatch = useAppDispatch();

  const navigate = useNavigate();

  const handleOpenDialogDetail = (record: PackageSetting) => {
    setOpenPackageSettingDetail(record);
  };

  const handleOpenDialogDelete = (record: PackageSetting) => {
    setOpenDeletePackageSetting(record);
  };

  const handleCloseDialogDetail = () => {
    setOpenPackageSettingDetail(null);
  };

  const handleCloseDialogDelete = () => {
    setOpenDeletePackageSetting(null);
  };

  const columns: ColumnsType<PackageSetting> = useMemo(() => {
    return [
      {
        key: 'title',
        title: () => t('packageSettings:title'),
        dataIndex: 'title',
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
        width: 250,
      },
      {
        key: 'description',
        title: () => t('packageSettings:description'),
        dataIndex: 'description',
        render: (value: string) => <Typography fontSize={14}>{value}</Typography>,
        width: 700,
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
                  navigate(`/admin/package-settings/${row._id}`);
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
        width: 80,
      },
    ];
  }, [navigate, t]);

  const renderDialogDelete = () => {
    if (openDeletePackageSetting === null) {
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
              loading={queueDeletePackageSetting.includes(openDeletePackageSetting?._id)}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeletePackageSetting) {
                  dispatch(
                    packageSettingsActions.deletePackageSettingRequest({
                      id: openDeletePackageSetting._id,
                      onSuccess: () => {
                        toast(
                          <ToastCustom type="success" text={t('translation:delete_type_success', { type: t('packageSettings:package_settings') })} />,
                          {
                            className: toastClass.toastSuccess,
                          },
                        );
                        handleCloseDialogDelete();
                      },
                      onFailure: () => {
                        toast(
                          <ToastCustom type="error" text={t('translation:delete_type_error', { type: t('packageSettings:package_settings') })} />,
                          {
                            className: toastClass.toastError,
                          },
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

  const renderDialogDetail = () => {
    if (openPackageSettingDetail === null) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogDetail}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle sx={{ padding: '0 !important' }}>{openPackageSettingDetail.title}</DialogTitle>
            <IconButton onClick={handleCloseDialogDetail}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <Grid container spacing={2}>
            {openPackageSettingDetail &&
              PROPERTIES_IN_DIALOG.map(property => (
                <Fragment key={property}>
                  <Grid item xs={3}>
                    <Typography variant="body2">{t(`packageSettings:${property}`)}:</Typography>
                  </Grid>
                  <Grid item xs={9}>
                    <Typography variant="body2">{openPackageSettingDetail[property]}</Typography>
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
        loading={statusGetPackageSettings === 'loading'}
        columns={columns}
        dataSource={packageSettings}
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
            packageSettingsActions.getPackageSettingsRequest({
              page: getPaginationFromAntdTable({ pagination, extra }),
              sorter: getSorterParamsFromAntdTable({ sorter }),
              searcher: currentSearcher,
            }),
          );
        }}
      />
      {renderDialogDetail()}
      {renderDialogDelete()}
      {Notification}
    </Box>
  );
}

export default memo(TablePackageSettings);
