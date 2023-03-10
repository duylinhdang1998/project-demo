import { PaymentStatus } from 'models/PaymentStatus';

export const getPaymentStatusTag = (paymentStatus: PaymentStatus) => {
  if (paymentStatus === PaymentStatus.APPROVED) {
    return {
      color: 'rgba(51, 204, 127, 1)',
      backgroundColor: 'rgba(241, 255, 244, 1)',
    };
  }
  return {
    color: 'rgba(255, 39, 39, 1)  ',
    backgroundColor: 'rgba(255, 237, 237, 1)',
  };
};
