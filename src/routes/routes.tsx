import AuthLayout from 'layout/AuthLayout';
import Layout from 'layout/Layout';
import { ForgetPassword, LoginPage, NotFound, SignUp } from 'pages';
import { AccountRoutes } from './account-routes';
import { AdminRoutes } from './admin-routes';
import { AgentRoutes } from './agent-routes';
import { RouteObject } from 'react-router-dom';
import ErrorBoundary2 from 'components/ErrorBoundary/ErrorBoundary2';
import { DomainNotFound } from 'pages/DomainNotFound/DomainNotFound';
import env from 'env';
import { DomainValidatorLayout } from 'layout/DomainValidatorLayout';

export const getRoutes = (): RouteObject[] => {
  return [
    {
      path: '',
      element: <DomainValidatorLayout />,
      children: [
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
          errorElement: !env.isDevMode ? <ErrorBoundary2 /> : null,
        },
        {
          path: '/domain-not-found',
          element: <DomainNotFound />,
          errorElement: !env.isDevMode ? <ErrorBoundary2 /> : null,
        },
        {
          path: '/admin',
          element: <Layout />,
          children: AdminRoutes,
          errorElement: !env.isDevMode ? <ErrorBoundary2 /> : null,
        },
        {
          path: '/agent',
          element: <Layout />,
          children: AgentRoutes,
          errorElement: !env.isDevMode ? <ErrorBoundary2 /> : null,
        },
        {
          path: '/account',
          element: <Layout />,
          children: AccountRoutes,
          errorElement: !env.isDevMode ? <ErrorBoundary2 /> : null,
        },
      ],
    },
    { path: '*', element: <NotFound /> },
  ];
};
