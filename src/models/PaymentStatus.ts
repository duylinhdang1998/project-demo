export enum EPaymentStatus {
  PENDING = 'PENDING',
  CREATED = 'CREATED',
  APPROVED = 'APPROVED',
  VOIDED = 'VOIDED',
}

export const PaymentStatusLabelMapping: Record<EPaymentStatus, string> = {
  APPROVED: 'Paid',
  CREATED: 'Not Paid',
  PENDING: 'Not Paid',
  VOIDED: 'Not Paid',
};

export const PaymentStatusColorMapping: Record<EPaymentStatus, string> = {
  APPROVED: 'rgba(51, 204, 127, 1)',
  CREATED: 'rgba(255, 39, 39, 1)',
  PENDING: 'rgba(255, 39, 39, 1)',
  VOIDED: 'rgba(255, 39, 39, 1)',
};

export const PaymentStatusBackgroundColorMapping: Record<EPaymentStatus, string> = {
  APPROVED: 'rgba(241, 255, 244, 1)',
  CREATED: 'rgba(255, 237, 237, 1)',
  PENDING: 'rgba(255, 237, 237, 1)',
  VOIDED: 'rgba(255, 237, 237, 1)',
};
