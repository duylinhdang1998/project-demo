import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, Grid, Stack } from '@mui/material';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { Result } from 'components/SelectDecouplingData/SelectDestination';
import dayjs from 'dayjs';
import { useCurrency } from 'hooks/useCurrency';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { fieldsSearch } from './constants';
import { StatisticBox } from '../Reporting/components/StatisticBox';
import { useGetStatisticPackageSales } from 'services/Report/getStatisticPackageSales';
import { get } from 'lodash-es';
import { useGetListPackageSales } from 'services/PackageSales/packageSales';
import { useMount } from 'ahooks';
import { PackageSale } from 'models/PackageSales';
import { Searcher } from 'services/@types/SearchParams';
import { dayjsToNumber } from 'utils/dayjsToNumber';
import TablePackageSales from '../PackageSales/components/TablePackageSales';
import { getSorterParamsFromAntdTable } from 'utils/getSorterParamsFromAntdTable';
import { getPaginationFromAntdTable } from 'utils/getPaginationFromAntdTable';
import { useExportPackageSales } from 'services/Report/exportPackageSales';

interface Values {
  departurePoints?: { value: Result };
  from: string;
  package?: { value: Result };
  departureTime?: [dayjs.Dayjs, dayjs.Dayjs];
}

const ReportingPackageSales: FC = () => {
  const { control, handleSubmit } = useForm<Values>();

  const [sortOrder, setSortOrder] = useState<any>({});
  const [filterValues, setFilterValues] = useState<any>({});

  const { exportPdf, isLoading } = useExportPackageSales();

  const { data: statisticData } = useGetStatisticPackageSales();
  const { data: dataReports, loading, run: getListPkgSales, refresh } = useGetListPackageSales();

  const { currencyFormat } = useCurrency();

  const { t } = useTranslation(['reportings']);

  useMount(() => {
    getListPkgSales({
      page: 0,
      searcher: {},
      sorter: {},
    });
  });

  const onSubmit = (values: Values) => {
    const searcher: Searcher<PackageSale> = {
      departurePoint: {
        operator: 'contains',
        value: values.departurePoints?.value.title?.trim(),
      },
      'merchandises.package': {
        operator: 'contains',
        value: values.package?.value.title,
      },
      sender: {
        operator: 'contains',
        value: values.from,
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
      sorter: {},
    });
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('reportings')} />
      <Box p="24px">
        <Grid container spacing="8px" marginBottom="16px">
          <Grid item xs={12} md={12} lg={9}>
            <FilterTicket gap="8px" control={control} fields={fieldsSearch} filterKey="reportings" numberColumns={2.5} />
          </Grid>
          <Grid
            item
            xs={12}
            md={12}
            lg={3}
            sx={{
              alignSelf: 'flex-end',
            }}
          >
            <Stack direction={{ xs: 'column', md: 'row' }} alignItems="center" justifyContent="center" spacing="8px">
              <Button backgroundButton="#1aa6ee" variant="contained" fullWidth onClick={handleSubmit(onSubmit)}>
                {t('translation:search')}
              </Button>
              <Button loading={isLoading} backgroundButton="#33CC7F" variant="contained" fullWidth onClick={exportPdf} startIcon={<IosShareIcon />}>
                {t('pdf_export')}
              </Button>
            </Stack>
          </Grid>
        </Grid>
        <Stack display="flex" flexDirection="row" alignItems="center" gap="16px">
          <StatisticBox title={t('reportings:total_tickets')} color="#33CC7F" total={get(statisticData, 'data.totalTickets', 0)} />
          <StatisticBox
            title={t('reportings:total_prices')}
            color="#0A89CA"
            total={!!statisticData ? currencyFormat(get(statisticData, 'data.totalPrice', 0)) : currencyFormat(0)}
          />
        </Stack>
        <Box my="30px">
          <TablePackageSales
            onRefresh={refresh}
            dataSource={dataReports?.data.hits ?? []}
            pagination={dataReports?.data.pagination ?? { totalPages: 0, totalRows: 0 }}
            sortOrder={sortOrder}
            loading={loading}
            showAction={false}
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
    </Box>
  );
};

export default ReportingPackageSales;
