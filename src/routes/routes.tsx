import { SelectDecouplingData } from 'components/SelectDecouplingData/SelectDecouplingData';
import AuthLayout from 'layout/AuthLayout';
import Layout from 'layout/Layout';
import { ForgetPassword, LoginPage, NotFound, SignUp } from 'pages';
import { getOffices } from 'services/OfficesManager/Company/getOffices';
import { AccountRoutes } from './account-routes';
import { AdminRoutes } from './admin-routes';
import { AgentRoutes } from './agent-routes';

const TestPage = () => {
  return (
    <SelectDecouplingData
      service={async () => {
        const response = await getOffices({
          page: 0,
          searcher: {},
          sorter: {},
          isGetAll: true,
        });
        return response.data.hits;
      }}
      transformToOption={model => ({
        key: model._id,
        label: model.title,
        value: model,
      })}
      onChange={console.log}
    />
  );
};

export const getRoutes = () => {
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
    },
    {
      path: '/admin',
      element: <Layout />,
      children: AdminRoutes,
    },
    {
      path: '/agent',
      element: <Layout />,
      children: AgentRoutes,
    },
    {
      path: '/account',
      element: <Layout />,
      children: AccountRoutes,
    },
    {
      path: '/test',
      element: <TestPage />,
    },
    { path: '*', element: <NotFound /> },
  ];
};
