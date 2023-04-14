import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMount } from 'ahooks';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppSelector } from 'hooks/useAppSelector';
import { get } from 'lodash-es';
import { Country } from 'models/Country';
import { Option } from 'models/Field';
import { useState } from 'react';
import { PackageSale } from 'models/PackageSales';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { Searcher } from 'services/@types/SearchParams';
import { useGetListPackageSales } from 'services/PackageSales/packageSales';
import { selectAuth } from 'store/auth/selectors';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { columnsPackage } from './columnsPackage';
import { agentFieldSearch, fieldsSearch } from './constants';

interface Values {
  destination?: Country;
  payment_status?: Option;
  from: string;
  recipient: string;
  orderId: string;
}

export default function PackageSales() {
  const { t } = useTranslation(['packageSales', 'translation']);
  const theme = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);
  const isAgent = userInfo?.role === 'agent';
  const [sortOrder, setSortOrder] = useState<any>({});

  const [currentPage, setCurrentPage] = useState(0);
  const [filterValues, setFilterValues] = useState<any>({});

  const { data, loading, run: getListPkgSales } = useGetListPackageSales();

  const { control, handleSubmit } = useForm<Values>();

  useMount(() => {
    getListPkgSales({
      page: 0,
      searcher: {},
      sorter: {},
    });
  });

  const onSubmit = (values: Values) => {
    const searcher: Searcher<PackageSale> = {
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
      'paymentDetail.paymentStatus': {
        value: values.payment_status?.label,
        operator: 'eq',
      },
    };

    setFilterValues(searcher);
    setSortOrder({});
    getListPkgSales({
      page: 0,
      searcher,
      sorter: {},
    });
  };

  const handleAdd = () => {
    navigate('/agent/package-sales/create-package-orders');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('package_sales')} />

      <FadeIn>
        <Box p="24px">
          <Grid container spacing={2}>
            <Grid item xs={12} md={isAgent ? 8 : 11}>
              <FilterTicket
                control={control}
                fields={isAgent ? agentFieldSearch : fieldsSearch}
                numberColumns={isAgent ? 2.5 : 2}
                filterKey="packageSales"
                selectProps={{
                  isClearable: true,
                }}
              />
            </Grid>
            <Grid
              item
              xs={12}
              md={isAgent ? 4 : 1}
              sx={{
                alignSelf: 'flex-end',
              }}
            >
              <Stack direction="row" alignItems="center" justifyContent="center" spacing={2}>
                <Button variant="contained" fullWidth backgroundButton={theme.palette.primary.main} onClick={handleSubmit(onSubmit)}>
                  {t('translation:search')}
                </Button>
                {isAgent && (
                  <Button
                    variant="contained"
                    fullWidth
                    backgroundButton="#33CC7F"
                    onClick={handleAdd}
                    startIcon={<AddIcon />}
                    sx={{ padding: '12px 16px !important' }}
                  >
                    {t('add_merchandise')}
                  </Button>
                )}
              </Stack>
            </Grid>
          </Grid>
          <Box my="30px">
            {data?.code === 0 && (
              <AntTable
                columns={columnsPackage(sortOrder)}
                loading={loading}
                dataSource={data?.data?.hits ?? []}
                rowKey={record => record._id ?? ''}
                pagination={{
                  pageSize: 10,
                  total: data?.data.pagination.totalRows,
                  current: currentPage + 1,
                }}
                onChange={(pagination, _, sorter, extra) => {
                  const sorterMap = getSorterParamsFromAntdTable({ sorter });
                  setSortOrder({
                    [`${get(sorter, 'columnKey', '')}`]: get(sorter, 'order', ''),
                  });
                  getListPkgSales({
                    page: getPaginationFromAntdTable({ pagination, extra }),
                    searcher: filterValues,
                    sorter: sorterMap,
                  });
                  setCurrentPage(getPaginationFromAntdTable({ pagination, extra }));
                }}
              />
            )}
          </Box>
        </Box>
      </FadeIn>
    </Box>
  );
}
