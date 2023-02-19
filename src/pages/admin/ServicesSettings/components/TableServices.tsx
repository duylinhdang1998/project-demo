import { Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { Box } from '@mui/system';
import { ColumnsType } from 'antd/es/table';
import AntTable from 'components/AntTable/AntTable';
import ToastCustom from 'components/ToastCustom/ToastCustom';
import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { ImageResource } from 'services/models/Resource';
import { ServiceSetting } from 'services/models/ServiceSetting';
import { useDeleteService } from 'services/ServiceSetting/Company/getServiceSettings';
import { useToastStyle } from 'theme/toastStyles';
import { getUrlOfResource } from 'utils/getUrlOfResource';
import ActionService from './ActionService';

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
}

function TableServices({ dataSource, onRefresh, loading }: Props) {
  const { t } = useTranslation('serviceSetting');
  const toastClass = useToastStyle();
  const classes = useStyles();
  const navigate = useNavigate();
  const { run: deleteService } = useDeleteService({
    onSuccess: data => {
      if (data.code === 0) {
        toast(<ToastCustom type="success" text={t('delete_service_success')} />, {
          className: toastClass.toastSuccess,
        });
        onRefresh?.();
      } else {
        toast(<ToastCustom type="error" text={t('delete_service_error)')} />, {
          className: toastClass.toastError,
        });
      }
    },
  });

  const handleDelete = (item: ServiceSetting) => () => {
    deleteService(item._id);
  };

  const handleEdit = (item: ServiceSetting) => () => {
    navigate('/admin/services-settings/' + item._id + '/edit');
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
      sorter: (a, b) => (a.title ?? '' > (b.title ?? '') ? 1 : -1),
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
      render: (_, item) => <ActionService onDelete={handleDelete(item)} onEdit={handleEdit(item)} />,
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
        }}
      />
    </Box>
  );
}

export default memo(TableServices);
