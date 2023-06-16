import { Dialog, Stack, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import AntTable from 'components/AntTable/AntTable';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { memo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImageResource } from 'services/models/Resource';
import { ServiceSetting } from 'services/models/ServiceSetting';
import { useDeleteService } from 'services/ServiceSetting/Company/getServiceSettings';
import { ServiceException } from 'services/utils/ServiceException';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import ActionService from './ActionService';
import { ParamsSettings } from 'services/models/Response';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import Button from 'components/Button/Button';

const useStyles = makeStyles(() => ({
  icon: {
    width: 30,
    height: 30,
    objectFit: 'contain',
  },
}));
interface Props {
  dataSource: ServiceSetting[];
  onRefresh?: () => void;
  loading?: boolean;
  pagination?: {
    totalRows?: number;
  };
  onFilter?: (params: ParamsSettings<ServiceSetting>) => void;
  sortOrder?: 'ascend' | 'descend';
}

function TableServices({ dataSource, onRefresh, loading, onFilter, pagination, sortOrder }: Props) {
  const { t } = useTranslation('serviceSetting');
  const classes = useStyles();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(0);

  const [openDeleteService, setOpenDeleteService] = useState<ServiceSetting | null>(null);

  const handleOpenDialogDelete = (record: ServiceSetting) => {
    setOpenDeleteService(record);
  };
  const handleCloseDialogDelete = () => {
    setOpenDeleteService(null);
  };

  const { loading: isDeleting, run: deleteService } = useDeleteService({
    onSuccess: data => {
      if (data.code === 0) {
        toast(<ToastCustom type="success" text={t('delete_service_success')} />, {
          className: 'toast-success',
        });
        onRefresh?.();
        handleCloseDialogDelete();
      } else {
        toast(<ToastCustom type="error" text={t('delete_service_error)')} description={ServiceException.getMessageError(data.code)} />, {
          className: 'toast-error',
        });
      }
    },
  });

  const handleDelete = async (item: ServiceSetting) => {
    deleteService(item._id);
  };

  const handleEdit = (item: ServiceSetting) => () => {
    navigate('/admin/services-settings/' + item._id);
  };

  const renderModalConfirmDelete = () => {
    if (openDeleteService === null) {
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
              loading={isDeleting}
              sx={{
                margin: '0 8px',
                color: '#FFFFFF',
                padding: '10px 40px',
              }}
              backgroundButton="rgba(255, 39, 39, 1)"
              onClick={() => {
                if (openDeleteService) {
                  handleDelete(openDeleteService);
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

  const columns: ColumnsType<ServiceSetting> = [
    {
      key: 'title',
      dataIndex: 'title',
      title: () => t('service_title'),
      render: (value: string) => (
        <Typography fontSize={14} color="#0C1132">
          {value}
        </Typography>
      ),
      sortOrder: !!sortOrder ? sortOrder : undefined,
      sorter: () => 0,
    },
    {
      key: 'icon',
      dataIndex: 'icon',
      title: () => t('service_icon'),
      render: (value: ImageResource) => <img src={getUrlOfResource(value)} className={classes.icon} />,
      align: 'center',
    },
    {
      key: 'action',
      title: () => t('service_action'),
      render: (_, item) => <ActionService onDelete={() => handleOpenDialogDelete(item)} onEdit={handleEdit(item)} />,
      align: 'center',
    },
  ];
  return (
    <Box my="24px">
      <AntTable
        columns={columns}
        dataSource={dataSource}
        rowKey={row => row._id}
        loading={loading}
        pagination={{
          pageSize: 10,
          total: pagination?.totalRows,
          current: currentPage + 1,
        }}
        onChange={(pagination, _, sorter, extra) => {
          setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
          onFilter?.({ page: getPaginationFromAntdTable({ pagination, extra }), sorter: getSorterParamsFromAntdTable({ sorter }), searcher: {} });
        }}
      />
      {renderModalConfirmDelete()}
    </Box>
  );
}

export default memo(TableServices);
