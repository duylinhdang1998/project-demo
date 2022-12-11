import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';
import { RouteObject } from 'react-router-dom';

const AgentRoutes: RouteObject[] = [
  {
    index: true,
    element: (
      <RequiredAuth>
        <Page.Agent.Dashboard />
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
    path: 'create-ticket-order',
    element: (
      <RequiredAuth>
        <Page.Agent.CreateTicketOrder />
      </RequiredAuth>
    ),
  },
  {
    path: 'traveller-contact-details',
    element: (
      <RequiredAuth>
        <Page.Agent.TravellerDetails />
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
    path: 'create-package-orders',
    element: (
      <RequiredAuth>
        <Page.Agent.CreatePackageOrders />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/add-merchandise',
    element: (
      <RequiredAuth>
        <Page.Agent.AddMerchandise />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/client-info',
    element: (
      <RequiredAuth>
        <Page.Agent.ClientInfo />
      </RequiredAuth>
    ),
  },
  {
    path: 'create-package-orders/order-confirm',
    element: (
      <RequiredAuth>
        <Page.Agent.OrderConfirm />
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
    path: 'control-ticket',
    element: (
      <RequiredAuth>
        <Page.Agent.ControlTicket />
      </RequiredAuth>
    ),
  },
  {
    path: 'control-merchandise-delivery',
    element: (
      <RequiredAuth>
        <Page.Agent.ControlMerchandise />
      </RequiredAuth>
    ),
  },
  {
    path: 'control-merchandise-details',
    element: (
      <RequiredAuth>
        <Page.Agent.ControlMerchandiseDetail />
      </RequiredAuth>
    ),
  },
  {
    path: 'routers',
    element: (
      <RequiredAuth>
        <Page.Routers />
      </RequiredAuth>
    ),
  },
];

export { AgentRoutes };
