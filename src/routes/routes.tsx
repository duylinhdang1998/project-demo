import AuthLayout from 'layout/AuthLayout';
import Layout from 'layout/Layout';
import { ForgetPassword, LoginPage, NotFound, SignUp } from 'pages';
import { AccountRoutes } from './account-routes';
import { AdminRoutes } from './admin-routes';
import { AgentRoutes } from './agent-routes';
import { RouteObject } from 'react-router-dom';
import ErrorBoundary2 from 'components/ErrorBoundary/ErrorBoundary2';
import { DomainNotFound } from 'pages/DomainNotFound/DomainNotFound';

const production = import.meta.env.PROD;

export const getRoutes = (): RouteObject[] => {
  return [
    {
      path: '/',
      element: <AuthLayout />,
      children: [
        { path: 'login', index: true, element: <LoginPage /> },
        {
          path: 'sign-up',
          element: <SignUp />,
        },
        {
          path: 'forgot-password',
          element: <ForgetPassword />,
        },
      ],
      errorElement: !!production ? <ErrorBoundary2 /> : null,
    },
    {
      path: '/404',
      element: <DomainNotFound />,
      errorElement: !!production ? <ErrorBoundary2 /> : null,
    },
    {
      path: '/admin',
      element: <Layout />,
      children: AdminRoutes,
      errorElement: !!production ? <ErrorBoundary2 /> : null,
    },
    {
      path: '/agent',
      element: <Layout />,
      children: AgentRoutes,
      errorElement: !!production ? <ErrorBoundary2 /> : null,
    },
    {
      path: '/account',
      element: <Layout />,
      children: AccountRoutes,
      errorElement: !!production ? <ErrorBoundary2 /> : null,
    },
    { path: '*', element: <NotFound /> },
  ];
};
