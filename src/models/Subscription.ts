export enum SubscriptionEnum {
  TRIAL = 'TRIAL',
  STANDARD = 'STANDARD',
  PRO = 'PRO',
  ENTERPRISE = 'ENTERPRISE',
}

export const SubscriptionLabelMapping: Record<SubscriptionEnum, string> = {
  TRIAL: 'trial',
  STANDARD: 'standard',
  PRO: 'pro',
  ENTERPRISE: 'enterprise',
};
