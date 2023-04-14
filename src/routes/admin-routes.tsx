import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';
import { RouteObject } from 'react-router-dom';

export const AdminRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <RequiredAuth role="admin">
        <Page.Dashboard />
      </RequiredAuth>
    ),
  },
  // Ticket sales
  {
    path: 'ticket-sales',
    element: (
      <RequiredAuth role="admin">
        <Page.TicketSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/:orderCode',
    element: (
      <RequiredAuth role="admin">
        <Page.DetailTicketPage />
      </RequiredAuth>
    ),
  },
  // Package sales
  {
    path: 'package-sales',
    element: (
      <RequiredAuth role="admin">
        <Page.PackageSales />
      </RequiredAuth>
    ),
  },
  // Service settings
  {
    path: 'services-settings/:id',
    element: (
      <RequiredAuth role="admin">
        <Page.AddService />
      </RequiredAuth>
    ),
  },
  {
    path: 'services-settings/add-service',
    element: (
      <RequiredAuth role="admin">
        <Page.AddService />
      </RequiredAuth>
    ),
  },
  {
    path: 'services-settings',
    element: (
      <RequiredAuth role="admin">
        <Page.ServicesSettings />
      </RequiredAuth>
    ),
  },
  // Package settings
  {
    path: 'package-settings/:packageSettingId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddPackageSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-settings/add-package-setting',
    element: (
      <RequiredAuth role="admin">
        <Page.AddPackageSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-settings',
    element: (
      <RequiredAuth role="admin">
        <Page.PackageSettings />
      </RequiredAuth>
    ),
  },
  // Vehicles
  {
    path: 'vehicles/:vehicleId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/add-new-vehicles',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles',
    element: (
      <RequiredAuth role="admin">
        <Page.Vehicles />
      </RequiredAuth>
    ),
  },
  // Vehicle events
  {
    path: 'vehicles/:vehicleId/update-event/:vehicleEventId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/:vehicleId/add-new-event',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/:vehicleId/list-events',
    element: (
      <RequiredAuth role="admin">
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  // Staff
  {
    path: 'staffs/add-new-staff',
    element: (
      <RequiredAuth role="admin">
        <Page.AddStaff />
      </RequiredAuth>
    ),
  },
  {
    path: 'staffs/:staffId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddStaff />
      </RequiredAuth>
    ),
  },
  {
    path: 'staffs',
    element: (
      <RequiredAuth role="admin">
        <Page.Staff />
      </RequiredAuth>
    ),
  },
  // Passengers
  {
    path: 'passengers/:passengerId',
    element: (
      <RequiredAuth role="admin">
        <Page.PassengerDetail />
      </RequiredAuth>
    ),
  },
  {
    path: 'passengers',
    element: (
      <RequiredAuth role="admin">
        <Page.Passengers />
      </RequiredAuth>
    ),
  },
  // Destinations
  {
    path: 'destination/:id',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewDestinations />
      </RequiredAuth>
    ),
  },
  {
    path: 'destination/add-new-destinations',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewDestinations />
      </RequiredAuth>
    ),
  },
  {
    path: 'destinations',
    element: (
      <RequiredAuth role="admin">
        <Page.Destinations />
      </RequiredAuth>
    ),
  },
  // Routers
  {
    path: 'routers',
    element: (
      <RequiredAuth role="admin">
        <Page.Routers />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers/create-oneway',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateOneWay />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers/create-multi',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateMultiStopWay />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers/update-oneway/:routeCode',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateOneWay />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers/update-multi/:routeCode',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateMultiStopWay />
      </RequiredAuth>
    ),
  },
];
