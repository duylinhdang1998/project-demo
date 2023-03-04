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
    path: 'services-settings/:id/edit',
    element: (
      <RequiredAuth role="admin">
        <Page.AddService />
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
  // Update vehicle
  {
    path: 'vehicles/:vehicleId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  // List vehicle
  {
    path: 'vehicles',
    element: (
      <RequiredAuth role="admin">
        <Page.Vehicles />
      </RequiredAuth>
    ),
  },
  // Add vehicle
  {
    path: 'vehicles/add-new-vehicles',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  // Update vehicle event
  {
    path: 'vehicles/:vehicleId/update-event/:vehicleEventId',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  // Add vehicle event
  {
    path: 'vehicles/:vehicleId/add-new-event',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  // List vehicle events
  {
    path: 'vehicles/:vehicleId/list-events',
    element: (
      <RequiredAuth role="admin">
        <Page.ListEvents />
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
  // List passengers
  {
    path: 'passengers',
    element: (
      <RequiredAuth role="admin">
        <Page.Passengers />
      </RequiredAuth>
    ),
  },
  // Update passenger
  {
    path: 'passengers/:passengerId',
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
    path: 'destination/:id/edit',
    element: (
      <RequiredAuth role="admin">
        <Page.AddNewDestinations />
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
