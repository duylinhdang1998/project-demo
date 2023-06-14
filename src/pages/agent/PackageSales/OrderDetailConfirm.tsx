import { Box, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Button from 'components/Button/Button';
import MerchandiseDetailView from 'components/MerchandiseDetailView/MerchandiseDetailView';
import OrderDetailView from 'components/OrderDetailView/OrderDetailView';
import PrintIcon from 'components/SvgIcon/PrintIcon';
import SendIcon from 'components/SvgIcon/SendIcon';
import LayoutDetail from 'layout/LayoutDetail';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { PackageSale } from 'models/PackageSales';
import { useGetPackageSale, useSendEmailPackageSale } from 'services/PackageSales/packageSales';
import { getNotifcation } from 'utils/getNotification';
import { ModalPrintTicket } from 'components/ModalPrintTicket/ModalPrintTicket';
import { Infomation } from 'pages/admin/TicketSales/DetailOrder/components/OrderDetail/Infomation';
import TextWithIcon from 'components/TextWithIcon/TextWithIcon';
import { MapPinIcon } from 'assets';
import dayjs from 'dayjs';
import { PaymentStatusBackgroundColorMapping, PaymentStatusColorMapping, PaymentStatusLabelMapping } from 'models/PaymentStatus';
import Tag from 'components/Tag/Tag';
import { get } from 'lodash-es';

export default function OrderDetailConfirm() {
  const { t } = useTranslation(['packageSales', 'translation', 'ticketSales']);
  const theme = useTheme();
  const params = useParams();
  const [openModalPrint, setOpenModalPrint] = useState(false);
  const { run: getPackageSaleDetail, data: dataDetails } = useGetPackageSale();

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
    if (!params.orderCode) {
      throw 'Some thing went wrong';
    } else {
      getPackageSaleDetail(params.orderCode);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.orderCode]);

  const handleSendEmail = () => {
    run({ orderCode: dataDetails?.orderCode ?? '' });
  };
  return (
    <LayoutDetail title={t('create_package_orders')} subTitle={t('package_sales')}>
      <Box width="100%" display="flex" justifyContent="center">
        <Box padding="24px" borderRadius={4} bgcolor="white" width={{ xs: '100%', md: '90%' }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {!!dataDetails && <OrderDetailView data={dataDetails as PackageSale} />}
            </Grid>
            <Grid item xs={12} md={4}>
              <Box bgcolor="#FAFDFF" borderRadius={4} padding="24px" height="100%">
                <MerchandiseDetailView merchandises={dataDetails?.merchandises} />
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
            <Button
              variant="contained"
              backgroundButton="#1AA6EE"
              sx={{ padding: '12px 16px' }}
              startIcon={<PrintIcon />}
              onClick={() => setOpenModalPrint(true)}
            >
              {t('ticketSales:print_ticket')}
            </Button>
          </Stack>
        </Box>
      </Box>
      <ModalPrintTicket
        open={openModalPrint}
        onClose={() => setOpenModalPrint(false)}
        title={t('packageSales:package_order').toUpperCase()}
        totalPrice={dataDetails?.totalPrice ?? 0}
        qrCode={dataDetails?.orderCode ?? ''}
      >
        <Infomation
          left={t('ticketSales:order_id')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.orderCode}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:lastName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.sender.lastName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:firstName')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.sender.firstName}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:trip')}
          right={
            <>
              <Box mb="8px">
                <TextWithIcon text={dataDetails?.departurePoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
              </Box>
              <TextWithIcon text={dataDetails?.arrivalPoint} icon={MapPinIcon} color="#1AA6EE" typography={{ fontSize: '14px' }} />
            </>
          }
        />
        <Infomation
          left={t('ticketSales:departureTime')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(dataDetails?.departureTime).format('DD/MM/YYYY - HH[H]mm')}
            </Typography>
          }
        />
        <Infomation
          left={t('packageSales:name_of_sender')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.sender.firstName} {dataDetails?.sender.lastName}
            </Typography>
          }
        />
        <Infomation
          left={t('packageSales:mobile_of_sender')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.sender.mobile}
            </Typography>
          }
        />
        <Infomation
          left={t('packageSales:name_of_recipient')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.recipent.firstName} {dataDetails?.recipent.lastName}
            </Typography>
          }
        />
        <Infomation
          left={t('packageSales:mobile_of_recipient')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.recipent.mobile}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:payment_status')}
          right={
            <Tag
              color={PaymentStatusColorMapping[get(dataDetails, 'paymentStatus', 'PENDING')]}
              backgroundColor={PaymentStatusBackgroundColorMapping[get(dataDetails, 'paymentStatus', 'PENDING')]}
              text={PaymentStatusLabelMapping[get(dataDetails, 'paymentStatus', 'PENDING')]}
            />
          }
        />
        <Infomation
          left={t('ticketSales:quantity')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.totalQuantity}
            </Typography>
          }
        />
        <Infomation
          left={t('packageSales:total_weight')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dataDetails?.totalWeight}
            </Typography>
          }
        />
        <Infomation
          left={t('ticketSales:created_on')}
          right={
            <Typography py="8px" fontSize={14} color={theme.palette.grey[300]}>
              {dayjs(dataDetails?.createdAt).format('DD/MM/YYYY - HH[H]mm')}
            </Typography>
          }
        />
      </ModalPrintTicket>
    </LayoutDetail>
  );
}
