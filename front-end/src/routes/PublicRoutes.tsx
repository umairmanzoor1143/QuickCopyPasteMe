// import SlickSlider from 'components/3d-slider';
import { lazy } from "react";
import { Outlet, RouteObject } from "react-router-dom";
import { Loadable } from "routes";
const Home = Loadable(lazy(() => import("pages/Home")));
const Connect = Loadable(lazy(() => import("pages/Connect")));
const MessageSection = Loadable(lazy(() => import("pages/Message")));

export const publicRoutes: RouteObject[] = [
  {
    path: "/",
    element: <Outlet />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/connect",
        element: <Connect />,
      },
      {
        path: "/message",
        element: <MessageSection />,
      },
    ],
  },
];
