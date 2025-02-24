import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../pages/Home";
import AddMenu from "../pages/AddMenu";
import Profile from "../pages/Profile";

const Routes = () => {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: '/',
          element: <Home/>
        },
        {
          path: '/add-memes',
          element: <AddMenu/>
        },
        {
          path: '/profile',
          element: <Profile/>
        },
      ]
    },
  ]);
  return <RouterProvider router={route}/>;
};

export default Routes;
