import React from "react";
import PrivateRoute from "./PrivateRoute";

import Layout from "../common/Layout";
import Welcome from "../common/Welcome/Welcome";

import NotFound from "../pages/Errors/NotFound";
import AccessDenied from "../pages/Errors/AccessDenied";

import Home from "../pages/Home";
import PersonalAccount from "../pages/Account";
// import PersonalAccount from "../pages/PersonalAccount";

import Auth from "../components/Auth/Auth";
import ProfileView from "../components/Admin/User/ProfileView";

import UserList from "../components/Admin/User/UserList";
import UserDetail from "../components/Admin/User/UserDetail";
import AddUser from "../components/Admin/User/AddUser";
import DetailsUpdate from "../components/Admin/DetailsUpdate";

import LogoList from "../components/Logo/LogoList";
import LogoStatus from "../components/Logo/LogoStatus";

const ADMIN = ["admin"];
const ALL = ["admin", "user"];

const routes = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/myaccount",
    element: <PrivateRoute roles={ALL} component={<PersonalAccount />} />,
    children: [
      // Welcome page
      {
        index: true,
        element: <Welcome />,
      },
      // Admin page
      // ADMINS ONLY
      {
        path: "admin",
        element: <PrivateRoute roles={ADMIN} component={<Layout />} />,
        children: [
          {
            path: "user",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <UserList />,
              },
              {
                path: "register",
                element: <AddUser />,
              },
            ],
          },
          {
            path: "user/:id",
            element: <Layout />,
            children: [
              {
                index: true,
                element: <UserDetail />,
              },
              {
                path: "logo/:logoId",
                element: <LogoStatus />,
                children: [
                  {
                    path: ":timelineId",
                    element: <DetailsUpdate />,
                  },
                ],
              },
            ],
          },
        ],
      },
      // User page
      // PUBLIC ONLY
      {
        path: "logo",
        element: <Layout />,
        children: [
          {
            index: true,
            element: <LogoList />,
          },
          {
            path: ":logoId",
            element: <LogoStatus />,
          },
        ],
      },
      {
        path: "profile",
        element: <ProfileView />,
      },
    ],
  },
  {
    path: "/AccessDenied",
    element: <AccessDenied />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
];

export default routes;
