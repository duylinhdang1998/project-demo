import { Box, Grid, Stack } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import LayoutDetail from 'layout/LayoutDetail';
import { useLocation } from 'react-router-dom';
import { get } from 'react-hook-form';
import { useEffect } from 'react';
import { isEmpty } from 'lodash-es';
import { PackageSale } from 'models/PackageSales';
import { useSendEmailPackageSale } from 'services/PackageSales/packageSales';
import { getNotifcation } from 'utils/getNotification';

export default function OrderDetailConfirm() {
  const { t } = useTranslation(['packageSales', 'translation', 'ticketSales']);
  const location = useLocation();
  const dataDetails: PackageSale = get(location, 'state.packageSale', {});
  // const [openModalPrint, setOpenModalPrint] = useState(false);
  console.log({ dataDetails });

  const { run, loading } = useSendEmailPackageSale({
    onSuccess: dataSendEmail => {
      getNotifcation({
        code: dataSendEmail.code,
        success: t('ticketSales:send_email_success'),
        error: t('ticketSales:send_email_error'),
      });
    },
  });
  useEffect(() => {
    if (isEmpty(dataDetails)) {
      throw 'Some thing went wrong';
    }
  }, [dataDetails]);

  const handleSendEmail = () => {
    run({ orderCode: dataDetails.orderCode });
  };
  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <OrderDetailView data={dataDetails} />
            </Grid>
            <Grid item xs={12} md={4}>
              <Box bgcolor="#FAFDFF" borderRadius={4} padding="24px" height="100%">
                <MerchandiseDetailView merchandises={dataDetails.merchandises} />
              </Box>
            </Grid>
          </Grid>
          <Stack direction="row" alignItems="center" justifyContent="flex-end" spacing={2} my="24px">
            <Button
              variant="outlined"
              sx={{
                padding: '12px 16px',
                backgroundColor: '#fff',
                '&:hover': {
                  backgroundColor: '#fff',
                  color: '#1AA6EE',
                },
              }}
              loading={loading}
              startIcon={<SendIcon fillColor="#1AA6EE" />}
              onClick={handleSendEmail}
            >
              {t('ticketSales:email_ticket')}
            </Button>
            <Button variant="contained" backgroundButton="#1AA6EE" sx={{ padding: '12px 16px' }} startIcon={<PrintIcon />}>
              {t('ticketSales:print_ticket')}
            </Button>
          </Stack>
        </Box>
      </Box>
      {/* <ModalPrintTicket open={openModalPrint} onClose={() => setOpenModalPrint(false)} record={record} /> */}
    </LayoutDetail>
  );
}
