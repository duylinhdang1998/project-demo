import AuthLayout from "layout/AuthLayout";
import Layout from "layout/Layout";
import { ForgetPassword, LoginPage, NotFound, SignUp } from "pages";
import { AccountRoutes } from "./account-routes";
import { AdminRoutes } from "./admin-routes";
import { AgentRoutes } from "./agent-routes";

export const getRoutes = (role: string) => {
  return [
    {
      path: "/",
      element: <AuthLayout />,
      children: [
        { path: "login", index: true, element: <LoginPage /> },
        {
          path: "sign-up",
          element: <SignUp />,
        },
        {
          path: "forgot-password",
          element: <ForgetPassword />,
        },
      ],
    },
    {
      path: "/admin",
      element: <Layout />,
      children: AdminRoutes,
    },
    {
      path: "/agent",
      element: <Layout />,
      children: AgentRoutes,
    },
    {
      path: "/account",
      element: <Layout />,
      children: AccountRoutes,
    },
    { path: "*", element: <NotFound /> },
  ];
};
