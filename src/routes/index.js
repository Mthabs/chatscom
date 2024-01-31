import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard.js';
// components
import LoadingScreen from '../components/LoadingScreen';
import { PATH_FEED, PATH_PAGE } from './paths.js';
import MainLayout from '../layouts/main/index.js';
import { PATH_AFTER_LOGIN } from '../config.js';

// ----------------------------------------------------------------------

const Loadable = Component => props => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense
      fallback={<LoadingScreen isDashboard={pathname.includes('/dashboard')} />}
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [{ path: '*', element: <Navigate to='/404' replace /> }],
    },
    {
      path: PATH_PAGE.login,
      children: [
        {
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          ),
          index: true,
        },
        // { path: 'home', element: <HomePage /> },
      ],
    },

    // FEED Routes
    {
      path: PATH_FEED.root,
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: PATH_FEED.home, element: <HomePage /> },
        { path: PATH_FEED.videos, element: <VideosPage /> },
        { path: PATH_FEED.photos, element: <PhotosPage /> },
        { path: PATH_FEED.profile, element: <UserProfile /> },
        { path: PATH_FEED.profileEdit, element: <EditProfile /> },
      ],
    },
    { path: '*', element: <Navigate to='/404' replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const Register = Loadable(lazy(() => import('../pages/auth/Register.jsx')));

// MAIN
const HomePage = Loadable(
  lazy(() => import('../pages/feed/home/HomePage.jsx'))
);
const VideosPage = Loadable(
  lazy(() => import('../pages/feed/videos/VideosPage.jsx'))
);
const PhotosPage = Loadable(
  lazy(() => import('../pages/feed/photos/PhotosPage.jsx'))
);
const UserProfile = Loadable(
  lazy(() => import('../pages/feed/profile/ProfilePage.jsx'))
);
const EditProfile = Loadable(
  lazy(() => import('../pages/feed/editProfile/EditProfile.jsx'))
);
