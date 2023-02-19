import { Box } from '@mui/material';
import { useMount } from 'ahooks';
import BoxSearch from 'components/BoxSearch/BoxSearch';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetListDestinations } from 'services/Destinations/destinations';
import TableDestinations from './components/TableDestinations';

export default function Destinations() {
  const { t } = useTranslation('destinations');
  const navigate = useNavigate();
  const { data: listDestinations, loading, run, refresh } = useGetListDestinations();
  const [searchValue, setSearchValue] = useState('');

  useMount(() => {
    run({
      page: 0,
      searcher: {},
      sorter: {},
    });
  });

  const handleAdd = () => {
    navigate('/admin/add-new-destinations');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('destinations')} />
      <Box padding="24px">
        <BoxSearch
          onAdd={handleAdd}
          addTextButton={t('translation:add_new', { type: t('destinations').toLowerCase() })}
          onSearch={value => {
            run({
              page: 0,
              searcher: {
                title: value,
              },
              sorter: {},
            });
            setSearchValue(value);
          }}
        />
        <TableDestinations
          dataSource={listDestinations?.data.hits}
          isLoading={loading}
          pagination={listDestinations?.data.pagination}
          onFilter={({ page, sorter }) => {
            run({
              page,
              sorter,
              searcher: {
                title: searchValue,
              },
            });
          }}
          onRefresh={refresh}
        />
      </Box>
    </Box>
  );
}
