import {
  DashboardIcon,
  DestinationIcon,
  PackageSaleIcon,
  PackageSettingIcon,
  PassengerIcon,
  ReportingIcon,
  RouterIcon,
  ServiceIcon,
  StaffIcon,
  TicketIcon,
  VehicleIcon,
} from 'assets';
import { RouteSideBar } from 'models/Route';

export const sidebars: RouteSideBar[] = [
  { path: '/admin/', icon: DashboardIcon, name: 'dashboard', isAgent: true },
  { path: '/admin/ticket-sales', icon: TicketIcon, name: 'ticket_sale', isAgent: true },
  { path: '/admin/package-sales', icon: PackageSaleIcon, name: 'package_sale', isAgent: true },
  { path: '/admin/services-settings', icon: ServiceIcon, name: 'service_settings' },
  { path: '/admin/routers', icon: RouterIcon, name: 'routers', isAgent: true },
  { path: '/admin/package-settings', icon: PackageSettingIcon, name: 'pacakage_settings' },
  { path: '/admin/vehicles', icon: VehicleIcon, name: 'vehicles', isAgent: true },
  { path: '/admin/staff', icon: StaffIcon, name: 'staff' },
  { path: '/admin/passengers', icon: PassengerIcon, name: 'passengers', isAgent: true },
  { path: '/admin/destinations', icon: DestinationIcon, name: 'destinations' },
  { path: '/admin/reportings', icon: ReportingIcon, name: 'reporting' },
];

export const sidebarsAgent: RouteSideBar[] = [
  { path: '/agent/', icon: DashboardIcon, name: 'dashboard', isAgent: true },
  { path: '/agent/ticket-sales', icon: TicketIcon, name: 'ticket_sale', isAgent: true },
  { path: '/agent/package-sales', icon: PackageSaleIcon, name: 'package_sale', isAgent: true },
  { path: '/agent/routers', icon: RouterIcon, name: 'routers', isAgent: true },
  { path: '/agent/vehicles', icon: VehicleIcon, name: 'vehicles', isAgent: true },
  { path: '/agent/passengers', icon: PassengerIcon, name: 'passengers', isAgent: true },
];
