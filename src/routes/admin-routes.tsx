import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';
import { RouteObject } from 'react-router-dom';

export const AdminRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <RequiredAuth>
        <Page.Dashboard />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales',
    element: (
      <RequiredAuth>
        <Page.TicketSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/:id',
    element: (
      <RequiredAuth>
        <Page.DetailTicketPage />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales',
    element: (
      <RequiredAuth>
        <Page.PackageSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'services-settings',
    element: (
      <RequiredAuth>
        <Page.ServicesSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-service',
    element: (
      <RequiredAuth>
        <Page.AddService />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-settings',
    element: (
      <RequiredAuth>
        <Page.PackageSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-package-settings',
    element: (
      <RequiredAuth>
        <Page.AddPacakageSettings />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles',
    element: (
      <RequiredAuth>
        <Page.Vehicles />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-new-vehicles',
    element: (
      <RequiredAuth>
        <Page.AddNewVehicles />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-new-event',
    element: (
      <RequiredAuth>
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: 'list-events',
    element: (
      <RequiredAuth>
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  {
    path: 'staff',
    element: (
      <RequiredAuth>
        <Page.Staff />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-new-staff',
    element: (
      <RequiredAuth>
        <Page.AddStaff />
      </RequiredAuth>
    ),
  },
  {
    path: 'passengers',
    element: (
      <RequiredAuth>
        <Page.Passengers />
      </RequiredAuth>
    ),
  },
  {
    path: 'passengers/:id',
    element: (
      <RequiredAuth>
        <Page.PassengerDetail />
      </RequiredAuth>
    ),
  },
  {
    path: 'destinations',
    element: (
      <RequiredAuth>
        <Page.Destinations />
      </RequiredAuth>
    ),
  },
  {
    path: 'add-new-destinations',
    element: (
      <RequiredAuth>
        <Page.AddNewDestinations />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers',
    element: (
      <RequiredAuth>
        <Page.Routers />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/create-oneway',
    element: (
      <RequiredAuth>
        <Page.CreateOneWay />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/create-multi',
    element: (
      <RequiredAuth>
        <Page.CreateMultiStopWay />
      </RequiredAuth>
    ),
  },
  {
    path: '/admin/routers/edit/:id',
    element: (
      <RequiredAuth>
        <Page.EditRouter />
      </RequiredAuth>
    ),
  },
];
