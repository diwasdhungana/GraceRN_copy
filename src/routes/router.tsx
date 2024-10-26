import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { AuthGuard } from '@/guards/auth-guard';
import { GuestGuard } from '@/guards/guest-guard';
import { AuthLayout } from '@/layouts/auth';
import { DashboardLayout } from '@/layouts/dashboard';
import { LazyPage } from './lazy-page';
import { paths } from './paths';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to={paths.dashboard.root} replace />,
  },
  {
    path: paths.auth.root,
    element: (
      <GuestGuard>
        <AuthLayout />
      </GuestGuard>
    ),
    children: [
      {
        index: true,
        path: paths.auth.root,
        element: <Navigate to={paths.auth.login} replace />,
      },
      {
        path: paths.auth.login,
        element: LazyPage(() => import('@/pages/auth/login')),
      },
      {
        path: paths.auth.register,
        element: LazyPage(() => import('@/pages/auth/register')),
      },
      {
        path: paths.auth.forgotPassword,
        element: LazyPage(() => import('@/pages/auth/forgot-password')),
      },
      // {
      //   path: routes.auth.resetPassword,
      //   element: LazyPage(() => import('@/pages/auth/reset-password')),
      // },
      {
        path: paths.auth.otp,
        element: LazyPage(() => import('@/pages/auth/otp')),
      },
      // {
      //   path: routes.auth.terms,
      //   element: LazyPage(() => import('@/pages/auth/terms')),
      // },
      // {
      //   path: routes.auth.privacy,
      //   element: LazyPage(() => import('@/pages/auth/privacy')),
      // },
    ],
  },
  {
    path: paths.dashboard.root,
    element: (
      // <AuthGuard>
      <DashboardLayout />
      // </AuthGuard>
    ),
    children: [
      {
        index: true,
        path: paths.dashboard.root,
        element: <Navigate to={paths.dashboard.home} replace />,
      },
      {
        path: paths.dashboard.home,
        element: LazyPage(() => import('@/pages/dashboard/home')),
      },
      /* ---------------------------------- ADMIN ---------------------------------- */
      {
        path: paths.dashboard.admin.root,
        children: [
          {
            index: true,
            path: paths.dashboard.admin.root,
            element: LazyPage(() => import('@/pages/dashboard/home/admin/index')),
          },
          {
            path: paths.dashboard.admin.addQuestions.root,
            children: [
              {
                index: true,
                path: paths.dashboard.admin.addQuestions.root,
                element: LazyPage(() => import('@/pages/dashboard/home/admin/add-questions/index')),
              },
            ],
          },
          {
            path: paths.dashboard.admin.viewQuestions.root,
            children: [
              {
                index: true,
                path: paths.dashboard.admin.viewQuestions.root,
                element: LazyPage(
                  () => import('@/pages/dashboard/home/admin/view-questions/index')
                ),
              },
              {
                index: true,
                path: paths.dashboard.admin.viewQuestions.viewSpecificQuestions,
                element: LazyPage(
                  () => import('@/pages/dashboard/home/admin/view-questions/Specific/index')
                ),
              },
            ],
          },
        ],
      },
    ],
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
