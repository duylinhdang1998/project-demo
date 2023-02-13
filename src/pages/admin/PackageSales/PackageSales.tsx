import AddIcon from '@mui/icons-material/Add';
import { Grid, Stack, useTheme } from '@mui/material';
import { Box } from '@mui/system';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import AntTable from 'components/AntTable/AntTable';
import Button from 'components/Button/Button';
import FilterTicket from 'components/FilterTicket/FilterTicket';
import HeaderLayout from 'components/HeaderLayout/HeaderLayout';
import { useAppSelector } from 'hooks/useAppSelector';
import { selectAuth } from 'store/auth/selectors';
import { columnsPackage, dataPackageSales } from './columnsPackage';
import { agentFieldSearch, fieldsSearch, keysFieldsSearch } from './constants';

type Values = Record<typeof keysFieldsSearch[number], string>;

export default function PackageSales() {
  const { t } = useTranslation(['packageSales', 'translation']);
  const theme = useTheme();
  const navigate = useNavigate();
  const { userInfo } = useAppSelector(selectAuth);
  const isAgent = userInfo?.role === 'agent';

  const { control, handleSubmit } = useForm<Values>({
    defaultValues: {
      destination: '',
      from: '',
      recipient: '',
      payment_status: '',
      order_id: '',
    },
  });

  const onSubmit = (values: Values) => {
    console.log({ values });
  };

  const handleAdd = () => {
    navigate('/agent/create-package-orders');
  };

  return (
    <Box>
      <HeaderLayout activeSideBarHeader={t('package_sales')} />
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
          <AntTable columns={columnsPackage} dataSource={dataPackageSales()} rowKey={record => record.orderId ?? ''} />
        </Box>
      </Box>
    </Box>
  );
}
