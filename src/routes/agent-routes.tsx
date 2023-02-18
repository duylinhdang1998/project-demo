import { RouteObject } from 'react-router-dom';
import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';

const AgentRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.Dashboard />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales',
    element: (
      <RequiredAuth role="agent">
        <Page.TicketSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/:id',
    element: (
      <RequiredAuth role="agent">
        <Page.DetailTicketPage />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-ticket-order',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.CreateTicketOrder />
      </RequiredAuth>
    ),
  },
  {
    path: 'traveller-contact-details',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.TravellerDetails />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales',
    element: (
      <RequiredAuth role="agent">
        <Page.PackageSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.CreatePackageOrders />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/add-merchandise',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.AddMerchandise />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/client-info',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.ClientInfo />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/order-confirm',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.OrderConfirm />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles',
    element: (
      <RequiredAuth role="agent">
        <Page.Vehicles />
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
      <RequiredAuth role="agent">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: ':vehicleId/list-events',
    element: (
      <RequiredAuth role="agent">
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  {
    path: 'passengers',
    element: (
      <RequiredAuth role="agent">
        <Page.Passengers />
      </RequiredAuth>
    ),
  },
  {
    path: 'passengers/:id',
    element: (
      <RequiredAuth role="agent">
        <Page.PassengerDetail />
      </RequiredAuth>
    ),
  },
  {
    path: 'control-ticket',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.ControlTicket />
      </RequiredAuth>
    ),
  },
  {
    path: 'control-merchandise-delivery',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.ControlMerchandise />
      </RequiredAuth>
    ),
  },
  {
    path: 'control-merchandise-details',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.ControlMerchandiseDetail />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers',
    element: (
      <RequiredAuth role="agent">
        <Page.Routers />
      </RequiredAuth>
    ),
  },
];

export { AgentRoutes };
