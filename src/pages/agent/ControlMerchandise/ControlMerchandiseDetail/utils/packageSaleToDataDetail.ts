import { OrderDetailViewProps } from 'components/OrderDetailView/OrderDetailView';
import dayjs from 'dayjs';
import { PackageSale } from 'models/PackageSales';
import { PaymentStatus } from 'models/PaymentStatus';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { getAppWeightSymbol } from 'utils/getAppWeightSymbol';

export const packageSaleToDataDetail = (packageSale: PackageSale | null | undefined): OrderDetailViewProps['data'] => {
  return {
    order_id: packageSale?.orderCode ?? '',
    trip: [packageSale?.departurePoint ?? '', packageSale?.arrivalPoint ?? ''],
    date: dayjs(packageSale?.createdAt).format('MM/DD/YYYY - HH[H]mm'),
    sender_name: packageSale?.sender?.firstName + ' ' + packageSale?.sender?.lastName,
    sender_mobile: packageSale?.sender?.mobile ?? '',
    recipent_name: packageSale?.recipent?.firstName + ' ' + packageSale?.recipent?.lastName,
    recipent_mobile: packageSale?.recipent?.mobile ?? '',
    quantity: packageSale?.totalQuantity ?? 0,
    weight: `${packageSale?.totalWeight ?? 0}${getAppWeightSymbol()}`,
    price: `${getAppCurrencySymbol()}${packageSale?.totalPrice ?? 0}`,
    // Cái gì ở đây ?
    payment_status: PaymentStatus.APPROVED,
    delivery_status: packageSale?.deliveryStatus ?? 'unfulfilment',
  };
};
