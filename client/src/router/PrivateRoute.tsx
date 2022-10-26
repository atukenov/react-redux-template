import React from "react";
import { Navigate } from "react-router-dom";
import { useAppSelector } from "../app/hooks";
import { authSelector } from "../slices/authSlice";

interface Props {
  component: React.ReactElement;
  path?: string;
  roles: Array<string>;
}

const PrivateRoute: React.FC<Props> = ({
  component: RouteComponent,
  roles,
}) => {
  const auth = useAppSelector(authSelector);
  const isAuthenticated = auth.isAuth;
  const user = auth.user;
  const loading = auth.loading;
  const userHasRequiredRole =
    user && user.roles.some((r) => roles.includes(r)) ? true : false;

  if (isAuthenticated && !userHasRequiredRole)
    return <Navigate to="/AccessDenied" />;
  if (!isAuthenticated && !loading) return <Navigate to="/login" />;
  if (isAuthenticated && !loading && userHasRequiredRole) return RouteComponent;
  return null;
};

export default PrivateRoute;
