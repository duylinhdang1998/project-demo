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
  // Ticket sales
  {
    path: 'ticket-sales/:orderCode',
    element: (
      <RequiredAuth role="agent">
        <Page.DetailOrder />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/create-ticket-order',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.SelectTripOnCreateOrder />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/traveller-contact-details',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.OrderDetailOnCreateOrder />
      </RequiredAuth>
    ),
  },
  {
    path: 'ticket-sales/:orderCode/edit',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.OrderDetailOnCreateOrder />
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
  // Package sales
  {
    path: 'package-sales/create-package-orders',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.CreatePackageOrders />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales/create-package-orders/client-info',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.ClientInfo />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales/edit/:orderCode',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.EditPackageSales />
      </RequiredAuth>
    ),
  },
  {
    path: 'package-sales/:orderCode',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.OrderDetailConfirm />
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
  // Vehicles
  {
    path: 'vehicles',
    element: (
      <RequiredAuth role="agent">
        <Page.Vehicles />
      </RequiredAuth>
    ),
  },
  // Vehicle events
  {
    path: 'vehicles/:vehicleId/update-event/:vehicleEventId',
    element: (
      <RequiredAuth role="agent">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/:vehicleId/add-new-event',
    element: (
      <RequiredAuth role="agent">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  {
    path: 'vehicles/:vehicleId/list-events',
    element: (
      <RequiredAuth role="agent">
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  // Passengers
  {
    path: 'passengers/:passengerId',
    element: (
      <RequiredAuth role="agent">
        <Page.PassengerDetail />
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
        <Page.Agent.ControlMerchandiseChecking />
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
  // Routers
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
