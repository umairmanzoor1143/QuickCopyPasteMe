import { Outlet, RouteObject } from 'react-router-dom';


// const Messages = Loadable(lazy(() => import('pages/messages')));

export const privateRoutes: RouteObject[] = [
  {
    path: '/',
    element: (
        <Outlet />
    ),
    children: [
      {
        path: 'profile',
        element: <div>private route</div>,
      },
    ],
  }
];
