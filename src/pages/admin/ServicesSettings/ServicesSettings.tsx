import { Box } from '@mui/system';
import { useUpdateEffect } from 'ahooks';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { ServiceSetting } from 'services/models/ServiceSetting';
import { useGetServiceSettings } from 'services/ServiceSetting/Company/getServiceSettings';
import TableServices from './components/TableServices';

function ServicesSettings() {
  const { t } = useTranslation('serviceSetting');
  const [listServices, setListServices] = useState<ServiceSetting[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const { refresh, loading, run } = useGetServiceSettings(
    {
      page: 0,
      searcher: {
        title: searchValue,
      },
      sorter: {},
    },
    {
      onSuccess: data => {
        if (data.code === 0) {
          setListServices(data.data.hits);
        }
      },
    },
  );

  useUpdateEffect(() => {
    run();
  }, [searchValue]);

  const handleAdd = () => {
    navigate('/admin/add-service');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('service_settings')} />
      <Box padding="24px">
        <BoxSearch
          onAdd={handleAdd}
          addTextButton={t('add_service')}
          onSearch={value => {
            console.log({ value });
            setSearchValue(value);
          }}
        />
        <TableServices dataSource={listServices} onRefresh={refresh} loading={loading} />
      </Box>
    </Box>
  );
}

export default ServicesSettings;
