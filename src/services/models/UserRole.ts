export type UserRole = 'COMPANY_ADMIN' | 'COMPANY_AGENT' | 'COMPANY_DRIVER' | 'PASSENGER';

export const UserRoleMappingToLabel: Record<UserRole, string> = {
  COMPANY_ADMIN: 'Admin',
  COMPANY_AGENT: 'Agent',
  PASSENGER: 'Passenger',
  COMPANY_DRIVER: 'Company driver',
};
