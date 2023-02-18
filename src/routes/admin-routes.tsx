import { RouteObject } from 'react-router-dom';
import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';

export const AdminRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <RequiredAuth role="admin">
        <Page.Dashboard />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales',
    element: (
      <RequiredAuth role="admin">
        <Page.TicketSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/:id',
    element: (
      <RequiredAuth role="admin">
        <Page.DetailTicketPage />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales',
    element: (
      <RequiredAuth role="admin">
        <Page.PackageSales />
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
  {
    path: 'add-service',
    element: (
      <RequiredAuth role="admin">
        <Page.AddService />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-settings/:packageSettingId',
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
  {
    path: 'add-package-setting',
    element: (
      <RequiredAuth role="admin">
        <Page.AddPackageSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/:vehicleId',
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
  {
    path: 'add-new-vehicles',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  {
    path: ':vehicleId/update-event/:vehicleEventId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: ':vehicleId/add-new-event',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: ':vehicleId/list-events',
    element: (
      <RequiredAuth role="admin">
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  {
    path: 'staff',
    element: (
      <RequiredAuth role="admin">
        <Page.Staff />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-new-staff',
    element: (
      <RequiredAuth role="admin">
        <Page.AddStaff />
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
  {
    path: 'passengers/:id',
    element: (
      <RequiredAuth role="admin">
        <Page.PassengerDetail />
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
  {
    path: 'add-new-destinations',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewDestinations />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/update-oneway/:routerId',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateOneWay />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/update-multi/:routerId',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateMultiStopWay />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers',
    element: (
      <RequiredAuth role="admin">
        <Page.Routers />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/create-oneway',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateOneWay />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/create-multi',
    element: (
      <RequiredAuth role="admin">
        <Page.CreateMultiStopWay />
      </RequiredAuth>
    ),
  },
];
