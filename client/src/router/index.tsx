import { Suspense } from "react";
import { useRoutes } from "react-router-dom";
import routes from "./config";

const Router = () => {
  return <Suspense fallback={null}>{useRoutes(routes)}</Suspense>;
};

export default Router;
