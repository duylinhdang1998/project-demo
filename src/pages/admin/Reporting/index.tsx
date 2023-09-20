import IosShareIcon from '@mui/icons-material/IosShare';
import { Box, Grid, Stack } from '@mui/material';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { Result } from 'components/SelectDecouplingData/SelectDestination';
import dayjs from 'dayjs';
import { useAppDispatch } from 'hooks/useAppDispatch';
import { useCurrency } from 'hooks/useCurrency';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { reportsActions } from 'store/report/reportSlice';
import { StatisticBox } from './components/StatisticBox';
import TableReportings from './components/TableReportings';
import { fieldsSearch } from './constants';
import { useExportTicketSales } from 'hooks/useExportTicketSales';

interface Values {
  departurePoints?: { value: Result };
  arrivalPoints?: { value: Result };
  departureTime?: [dayjs.Dayjs, dayjs.Dayjs];
  routeId?: string;
}

const Reporting: FC = () => {
  const { control, handleSubmit } = useForm<Values>();

  const { exportPdf, isLoading } = useExportTicketSales();

  const { currencyFormat } = useCurrency();

  const dispatch = useAppDispatch();

  const { t } = useTranslation(['reportings']);

  const onSubmit = (values: Values) => {
    dispatch(
      reportsActions.getTicketSalesRequest({
        page: 0,
        sorter: {},
        searcher: {
          'routePoint.departurePoint': {
            operator: 'eq',
            value: values.departurePoints,
          },
          routeCode: {
            operator: 'contains',
            value: values.routeId,
          },
          departureTime: [
            {
              operator: 'gte',
              value: values.departureTime?.[0].valueOf(),
            },
            {
              operator: 'lte',
              value: values.departureTime?.[0].valueOf(),
            },
          ],
        },
      }),
    );
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
          <StatisticBox title={t('reportings:total_tickets')} color="#33CC7F" total="100" />
          <StatisticBox title={t('reportings:total_prices')} color="#0A89CA" total={currencyFormat(100)} />
        </Stack>
        <TableReportings />
      </Box>
    </Box>
  );
};

export default Reporting;
