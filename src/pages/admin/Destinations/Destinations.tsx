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
  const [sortOrder, setSortOrder] = useState<'ascend' | 'descend' | undefined>();

  useMount(() => {
    run({
      page: 0,
      searcher: {},
      sorter: {},
    });
  });

  const handleAdd = () => {
    navigate('/admin/destination/add-new-destinations');
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
                title: { value, operator: 'contains' },
              },
              sorter: {},
            });
            setSortOrder(undefined);
            setSearchValue(value);
          }}
        />
        <TableDestinations
          dataSource={listDestinations?.data.hits}
          isLoading={loading}
          sortOrder={sortOrder}
          pagination={listDestinations?.data.pagination}
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
          onRefresh={refresh}
        />
      </Box>
    </Box>
  );
}
