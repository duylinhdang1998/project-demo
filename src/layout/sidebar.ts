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
  { path: '/admin/', icon: DashboardIcon, name: 'dashboard', isAgent: true, isRouteStrict: true },
  { path: '/admin/ticket-sales', icon: TicketIcon, name: 'ticket_sale', isAgent: true, isRouteStrict: false },
  { path: '/admin/package-sales', icon: PackageSaleIcon, name: 'package_sale', isAgent: true, isRouteStrict: false },
  { path: '/admin/services-settings', icon: ServiceIcon, name: 'service_settings', isRouteStrict: false },
  { path: '/admin/routers', icon: RouterIcon, name: 'routers', isAgent: true, isRouteStrict: false },
  { path: '/admin/package-settings', icon: PackageSettingIcon, name: 'pacakage_settings', isRouteStrict: false },
  { path: '/admin/vehicles', icon: VehicleIcon, name: 'vehicles', isAgent: true, isRouteStrict: false },
  { path: '/admin/staffs', icon: StaffIcon, name: 'staff', isRouteStrict: false },
  { path: '/admin/passengers', icon: PassengerIcon, name: 'passengers', isAgent: true, isRouteStrict: false },
  { path: '/admin/destinations', icon: DestinationIcon, name: 'destinations', isRouteStrict: false },
  { path: '/admin/reportings', icon: ReportingIcon, name: 'reporting', isRouteStrict: false },
];

export const sidebarsAgent: RouteSideBar[] = [
  { path: '/agent/', icon: DashboardIcon, name: 'dashboard', isAgent: true, isRouteStrict: true },
  { path: '/agent/ticket-sales', icon: TicketIcon, name: 'ticket_sale', isAgent: true, isRouteStrict: false },
  { path: '/agent/package-sales', icon: PackageSaleIcon, name: 'package_sale', isAgent: true, isRouteStrict: false },
  { path: '/agent/routers', icon: RouterIcon, name: 'routers', isAgent: true, isRouteStrict: false },
  { path: '/agent/vehicles', icon: VehicleIcon, name: 'vehicles', isAgent: true, isRouteStrict: false },
  { path: '/agent/passengers', icon: PassengerIcon, name: 'passengers', isAgent: true, isRouteStrict: false },
];
