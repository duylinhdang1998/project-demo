import ClearIcon from '@mui/icons-material/Clear';
import { Dialog, Divider, IconButton, Stack, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/lib/table';
import ActionTable from 'components/ActionTable/ActionTable';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import { DialogTitle } from 'components/DialogTitle/DialogTitle';
import DeleteIcon from 'components/SvgIcon/DeleteIcon';
import EditIcon from 'components/SvgIcon/EditIcon';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useAppSelector } from 'hooks/useAppSelector';
import { memo, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { RECORDS_PER_PAGE } from 'services/PackageSetting/Company/getPackageSettings';
import { PackageSetting } from 'services/models/PackageSetting';
import { packageSettingsActions } from 'store/packageSettings/packageSettingsSlice';
import { selectPackageSettings } from 'store/packageSettings/selectors';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { v4 as uuid } from 'uuid';

const PROPERTIES_IN_DIALOG: Array<keyof Pick<PackageSetting, 'title' | 'description'>> = ['title', 'description'];

function TablePackageSettings() {
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
                          <ToastCustom
                            type="success"
                            text={t('translation:delete_type_success', {
                              type: t('packageSettings:package_settings').toLowerCase(),
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
                              type: t('packageSettings:package_settings').toLowerCase(),
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

  const renderDialogDetail = () => {
    if (openPackageSettingDetail === null) {
      return null;
    }
    return (
      <Dialog open onClose={handleCloseDialogDetail}>
        <Box padding="24px">
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <DialogTitle>{openPackageSettingDetail.title}</DialogTitle>
            <IconButton onClick={handleCloseDialogDetail}>
              <ClearIcon />
            </IconButton>
          </Stack>
          <Divider variant="middle" sx={{ margin: '16px 0' }} />
          <Box display="flex" flexDirection="column" gap="8px">
            {openPackageSettingDetail &&
              PROPERTIES_IN_DIALOG.map(property => (
                <Box display="flex" key={property}>
                  <Typography minWidth="100px" flexBasis="33.33%" variant="body2">
                    {t(`packageSettings:${property}`)}:
                  </Typography>
                  <Typography flex={1} variant="body2">
                    {openPackageSettingDetail[property]}
                  </Typography>
                </Box>
              ))}
          </Box>
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
