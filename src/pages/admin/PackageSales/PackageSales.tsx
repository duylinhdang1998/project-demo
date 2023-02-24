import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useMount } from 'ahooks';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import { FadeIn } from 'components/FadeIn/FadeIn';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useAppSelector } from 'hooks/useAppSelector';
import { Country } from 'models/Country';
import { Option } from 'models/Field';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { useGetListPackageSales } from 'services/PackageSales/packageSales';
import { selectAuth } from 'store/auth/selectors';
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
    const searcher = Object.keys(values).reduce((acc, key) => {
      return {
        ...acc,
        ...(key === 'destination'
          ? {
              [key]: {
                value: values.destination?.code,
                operator: 'equal',
              },
            }
          : key === 'payment_status'
          ? {
              [key]: {
                value: values.payment_status?.label,
                operator: 'equal',
              },
            }
          : {
              [key]: {
                value: values[key],
                operator: 'equal',
              },
            }),
      };
    }, {});

    getListPkgSales({
      page: 0,
      searcher,
      sorter: {},
    });
  };

  const handleAdd = () => {
    navigate('/agent/create-package-orders');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('package_sales')} />
      {loading ? (
        <LoadingScreen />
      ) : (
        <FadeIn>
          <Box p="24px">
            <Grid container spacing={2}>
              <Grid item xs={12} md={isAgent ? 8 : 11}>
                <FilterTicket
                  control={control}
                  fields={isAgent ? agentFieldSearch : fieldsSearch}
                  numberColumns={isAgent ? 2.5 : 2}
                  filterKey="packageSales"
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
              <AntTable columns={columnsPackage} loading={loading} dataSource={data?.data.hits} rowKey={record => record._id ?? ''} />
            </Box>
          </Box>
        </FadeIn>
      )}
    </Box>
  );
}
