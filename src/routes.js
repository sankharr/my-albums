// modules
import React from "react";
import { Navigate, useRoutes } from "react-router-dom";

// layouts
import MainLayout from "./layouts/MainLayout";

// pages
const Overview = React.lazy(() => import("./pages/Overview"));
const AlbumDetail = React.lazy(() => import("./pages/AlbumDetail"));
const ErrorPage = React.lazy(() => import("./pages/ErrorPage"));

function Router() {
  return useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { path: "/", element: <Navigate to="/overview" /> },
        { path: "overview", element: <Overview /> },
        { path: "albumDetail", element: <AlbumDetail /> },
        { path: "errorPage", element: <ErrorPage /> },
      ],
    },
    { path: '*', element: <Navigate to="/errorPage" replace /> },
  ]);
}

export default Router;
