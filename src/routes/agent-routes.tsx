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
    path: 'ticket-sales/:orderCode',
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
        <Page.Agent.SelectTripOnCreateTicketSale />
      </RequiredAuth>
    ),
  },
  {
    path: 'traveller-contact-details',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.TicketDetailOnCreateTicketSale />
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
    path: 'create-package-orders/order-detail-confirm',
    element: (
      <RequiredAuth role="agent">
        <Page.Agent.OrderDetailConfirm />
      </RequiredAuth>
    ),
  },
  // List vehicles
  {
    path: 'vehicles',
    element: (
      <RequiredAuth role="agent">
        <Page.Vehicles />
      </RequiredAuth>
    ),
  },
  // Update vehicle event
  {
    path: 'vehicles/:vehicleId/update-event/:vehicleEventId',
    element: (
      <RequiredAuth role="agent">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  // Add vehicle event
  {
    path: 'vehicles/:vehicleId/add-new-event',
    element: (
      <RequiredAuth role="agent">
        <Page.AddNewEvent />
      </RequiredAuth>
    ),
  },
  // List vehicle events
  {
    path: 'vehicles/:vehicleId/list-events',
    element: (
      <RequiredAuth role="agent">
        <Page.ListEvents />
      </RequiredAuth>
    ),
  },
  // List passengers
  {
    path: 'passengers',
    element: (
      <RequiredAuth role="agent">
        <Page.Passengers />
      </RequiredAuth>
    ),
  },
  // Update passenger
  {
    path: 'passengers/:passengerId',
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
  // List routers
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
