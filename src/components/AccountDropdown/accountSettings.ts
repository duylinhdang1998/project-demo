import { ChangePassIcon, LogoutIcon, NoteIcon, OfficeIcon, OrderIcon, StaffIcon, SubcriptionIcon, WalletIcon } from 'assets';
import { UserRole } from 'utils/constant';

export const accountSettings = [
  { path: '/account-settings', name: 'settings', icon: StaffIcon },
  { path: '/offices-manager', name: 'offices_manager', icon: OfficeIcon, role: [UserRole.ADMIN] },
  { path: '/content-manager', name: 'content_manager', icon: NoteIcon, role: [UserRole.ADMIN] },
  { path: '/payment-methods', name: 'payment_methods', icon: WalletIcon, role: [UserRole.ADMIN] },
  { path: '/orders-setting', name: 'orders_setting', icon: OrderIcon, role: [UserRole.ADMIN] },
  { path: '/subscription', name: 'subscription', icon: SubcriptionIcon, role: [UserRole.ADMIN] },
  { path: '/change-password', name: 'change_pass', icon: ChangePassIcon },
  { path: 'logout', name: 'logout', icon: LogoutIcon },
];
