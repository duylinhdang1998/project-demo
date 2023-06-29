import { Box } from '@mui/system';
import { useMount } from 'ahooks';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetServiceSettings } from 'services/ServiceSetting/Company/getServiceSettings';
import TableServices from './components/TableServices';

function ServicesSettings() {
  const { t } = useTranslation('serviceSetting');
  const [searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();

  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>();

  const { refresh, loading, run, data } = useGetServiceSettings();

  useMount(() => {
    run({
      page: 0,
      searcher: {},
      sorter: {},
    });
  });

  const handleAdd = () => {
    navigate('/admin/services-settings/add-service');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('service_settings')} />
      <Box padding="24px">
        <BoxSearch
          onAdd={handleAdd}
          addTextButton={t('add_service')}
          onSearch={value => {
            run({
              page: 0,
              searcher: {
                title: { value, operator: 'contains' },
              },
              sorter: {},
            });
            setSortOrder(undefined);
            setSearchValue(value);
          }}
        />
        <TableServices
          dataSource={data?.data.hits ?? []}
          onRefresh={refresh}
          loading={loading}
          sortOrder={sortOrder}
          pagination={data?.data.pagination}
          onFilter={({ page, sorter }) => {
            setSortOrder(!!sorter.title ? (sorter.title === 'asc' ? 'ascend' : 'descend') : undefined);
            run({
              page,
              sorter,
              searcher: {
                title: { value: searchValue, operator: 'contains' },
              },
            });
          }}
        />
      </Box>
    </Box>
  );
}

export default ServicesSettings;
