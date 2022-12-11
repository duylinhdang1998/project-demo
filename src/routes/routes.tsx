import AuthLayout from 'layout/AuthLayout';
import Layout from 'layout/Layout';
import { ForgetPassword, LoginPage, NotFound, SignUp } from 'pages';
import type { RouteObject } from 'react-router-dom';
import { AccountRoutes } from './account-routes';
import { AdminRoutes } from './admin-routes';
import { AgentRoutes } from './agent-routes';

export const routes: RouteObject[] = [
  {
    path: '/auth',
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
  },
  {
    path: '/admin',
    element: <Layout />,
    children: AdminRoutes,
  },
  {
    path: '/account',
    element: <Layout />,
    children: AccountRoutes,
  },
  { path: '*', element: <NotFound /> },
];

export const getRoutes = (role: string) => {
  return [
    {
      path: '/auth',
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
    },
    {
      path: role === 'admin' ? '/admin' : '/agent',
      element: <Layout />,
      children: role === 'admin' ? AdminRoutes : AgentRoutes,
    },
    {
      path: '/account',
      element: <Layout />,
      children: AccountRoutes,
    },
    { path: '*', element: <NotFound /> },
  ];
};
