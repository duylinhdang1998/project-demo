import { UserRole } from 'utils/constant';

export interface UserInfo {
  role?: UserRole.ADMIN | UserRole.AGENT | UserRole.CLIENT;
}
