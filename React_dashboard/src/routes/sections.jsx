import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

export const LoginPage = lazy(() => import('src/pages/loginApp'));
export const RevenuePage = lazy(() => import('src/pages/revenueApp'));
export const UsersPage = lazy(() => import('src/pages/usersApp'));
export const TypesPage = lazy(() => import('src/pages/typesApp'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      path: '/login',
      element: (
        <Suspense fallback={<div>Loading...</div>}>
          <LoginPage />
        </Suspense>
      ),
    },
    {
      path: '/revenue',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <RevenuePage />, index: true },
      ],
    },
    {
      path: 'users',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <UsersPage />, index: true },
      ],
    },
    {
      path: 'types',
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <TypesPage />, index: true },
      ],
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '/',
      element: <Navigate to="/login" replace />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
