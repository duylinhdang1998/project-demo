import { RouteObject } from 'react-router-dom';
import RequiredAuth from 'hocs/RequiredAuth';
import * as Page from 'pages';

export const AccountRoutes: RouteObject[] = [
  {
    path: 'account-settings',
    element: (
      <RequiredAuth>
        <Page.AccountSetting />
      </RequiredAuth>
    ),
  },
  {
    path: 'change-password',
    element: (
      <RequiredAuth>
        <Page.ChangePassword />
      </RequiredAuth>
    ),
  },
  // List offices
  {
    path: 'offices-manager',
    element: (
      <RequiredAuth>
        <Page.OfficeManager />
      </RequiredAuth>
    ),
  },
  // Update office
  {
    path: 'offices-manager/:officeId',
    element: (
      <RequiredAuth>
        <Page.AddOfficeManager />
      </RequiredAuth>
    ),
  },
  // Add office
  {
    path: 'add-office-manager',
    element: (
      <RequiredAuth>
        <Page.AddOfficeManager />
      </RequiredAuth>
    ),
  },
  {
    path: 'payment-methods',
    element: (
      <RequiredAuth>
        <Page.PaymentMethod />
      </RequiredAuth>
    ),
  },
  {
    path: 'orders-setting',
    element: (
      <RequiredAuth>
        <Page.OrdersSetting />
      </RequiredAuth>
    ),
  },
  {
    path: 'subscription',
    element: (
      <RequiredAuth>
        <Page.Subscription />
      </RequiredAuth>
    ),
  },
  {
    path: 'subscription-package',
    element: (
      <RequiredAuth>
        <Page.SubscriptionPackage />
      </RequiredAuth>
    ),
  },
  {
    path: 'subscription-payment/:subscriptionType',
    element: (
      <RequiredAuth>
        <Page.SubscriptionPayment />
      </RequiredAuth>
    ),
  },
  {
    path: 'content-manager',
    element: (
      <RequiredAuth>
        <Page.ContentManager />
      </RequiredAuth>
    ),
  },
  {
    path: 'currency-setting',
    element: (
      <RequiredAuth>
        <Page.CurrencySetting />
      </RequiredAuth>
    ),
  },
];
