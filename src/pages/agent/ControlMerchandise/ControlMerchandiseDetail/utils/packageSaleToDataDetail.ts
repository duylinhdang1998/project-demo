import dayjs from 'dayjs';
import { PackageSale } from 'models/PackageSales';
import { PaymentStatus } from 'models/PaymentStatus';
import { getAppCurrencySymbol } from 'utils/getAppCurrencySymbol';
import { getAppWeightSymbol } from 'utils/getAppWeightSymbol';

export const packageSaleToDataDetail = (packageSale: PackageSale | null | undefined) => {
  return {
    order_id: packageSale?.orderCode,
    departure_point: packageSale?.departurePoint,
    date: dayjs(packageSale?.createdAt).format('MM/DD/YYYY - HH:mm'),
    sender_name: packageSale?.sender?.firstName + ' ' + packageSale?.sender?.lastName,
    sender_mobile: packageSale?.sender?.mobile,
    recipent_name: packageSale?.recipent?.firstName + ' ' + packageSale?.recipent?.lastName,
    recipent_mobile: packageSale?.recipent?.mobile,
    quantity: packageSale?.totalQuantity,
    weight: packageSale?.totalWeight + getAppWeightSymbol(),
    price: getAppCurrencySymbol() + packageSale?.totalPrice,
    payment_status: PaymentStatus.APPROVED,
    deliverStatus: packageSale?.deliveryStatus,
  };
};
