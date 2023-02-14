import { ChangePassIcon, LogoutIcon, NoteIcon, OfficeIcon, OrderIcon, StaffIcon, SubcriptionIcon, WalletIcon } from 'assets';

export const accountSettings = [
  { path: '/account-settings', name: 'settings', icon: StaffIcon },
  { path: '/offices-manager', name: 'offices_manager', icon: OfficeIcon },
  { path: '/content-manager', name: 'content_manager', icon: NoteIcon },
  { path: '/payment-methods', name: 'payment_methods', icon: WalletIcon },
  { path: '/orders-setting', name: 'orders_setting', icon: OrderIcon },
  { path: '/subscription', name: 'subscription', icon: SubcriptionIcon },
  { path: '/change-password', name: 'change_pass', icon: ChangePassIcon },
  { path: 'logout', name: 'logout', icon: LogoutIcon },
];
