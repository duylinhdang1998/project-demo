import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack } from '@mui/material';
import { Box } from '@mui/system';
import { useMount } from 'ahooks';
import Button from 'components/Button/Button';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { get } from 'lodash-es';
import { useState } from 'react';
import { PackageSale } from 'models/PackageSales';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Searcher } from 'services/@types/SearchParams';
import { useGetListPackageSales } from 'services/PackageSales/packageSales';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { fieldsSearch } from './constants';
import SearchIcon from '@mui/icons-material/Search';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import dayjs from 'dayjs';
import TablePackageSales from './components/TablePackageSales';

interface Values {
  destination?: { value: string };
  from: string;
  recipient: string;
  orderId: string;
  departureTime?: [dayjs.Dayjs, dayjs.Dayjs];
}

export default function PackageSales() {
  const { t } = useTranslation(['packageSales', 'translation']);
  const navigate = useNavigate();
  const [sortOrder, setSortOrder] = useState<any>({});
  const [filterValues, setFilterValues] = useState<any>({});

  const { data, loading, run: getListPkgSales, refresh } = useGetListPackageSales();

  const { control, handleSubmit } = useForm<Values>();

  useMount(() => {
    console.log('mountign package sales');
    getListPkgSales({
      page: 0,
      searcher: {},
      sorter: {
        createdAt: 'desc',
      },
    });
  });

  const onSubmit = (values: Values) => {
    const searcher: Searcher<PackageSale> = {
      arrivalPoint: {
        operator: 'eq',
        value: values.destination?.value,
      },
      orderCode: {
        value: values.orderId,
        operator: 'eq',
      },
      'sender.firstName': {
        value: values.from,
        operator: 'eq',
      },
      'recipent.firstName': {
        value: values.recipient,
        operator: 'eq',
      },
      departureTime: [
        {
          value: values.departureTime?.[0] && dayjsToNumber(values.departureTime[0]),
          operator: 'gte',
        },
        {
          value: values.departureTime?.[0] && dayjsToNumber(values.departureTime[1]),
          operator: 'lte',
        },
      ],
    };

    setFilterValues(searcher);
    setSortOrder({});
    getListPkgSales({
      page: 0,
      searcher,
      sorter: {
        createdAt: 'desc',
      },
    });
  };

  const handleAdd = () => {
    navigate(`create-package-orders`);
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('package_sales')} />

      <FadeIn>
        <Box p="24px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={9.5}>
              <FilterTicket
                gap="14px"
                control={control}
                fields={fieldsSearch}
                numberColumns={2.5}
                filterKey="packageSales"
                flexWrap={{ xs: 'wrap', md: 'nowrap' }}
                selectProps={{
                  isClearable: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={2.5}
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Button
                  sx={{ width: '40px', height: '40px', minWidth: 'initial', fontSize: '18px' }}
                  variant="contained"
                  fullWidth
                  onClick={handleSubmit(onSubmit)}
                  backgroundButton="#1AA6EE"
                >
                  <SearchIcon fontSize="inherit" />
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  backgroundButton="#33CC7F"
                  onClick={handleAdd}
                  startIcon={<AddIcon />}
                  sx={{ padding: '12px 16px !important', minWidth: '96px' }}
                >
                  <Box
                    sx={{
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {t('add_merchandise')}
                  </Box>
                </Button>
              </Stack>
            </Grid>
          </Grid>
          <Box my="30px">
            <TablePackageSales
              onRefresh={refresh}
              dataSource={data?.data.hits ?? []}
              pagination={data?.data.pagination ?? { totalPages: 0, totalRows: 0 }}
              sortOrder={sortOrder}
              loading={loading}
              onFilter={(pagination, _, sorter, extra) => {
                const sorterMap = getSorterParamsFromAntdTable({ sorter });
                setSortOrder({
                  [`${get(sorter, 'columnKey', '')}`]: get(sorter, 'order', ''),
                });
                getListPkgSales({
                  page: getPaginationFromAntdTable({ pagination, extra }),
                  searcher: filterValues,
                  sorter: sorterMap,
                });
              }}
            />
          </Box>
        </Box>
      </FadeIn>
    </Box>
  );
}
