/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import DesignLayout from 'src/layouts/DesignLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

const routesConfig = [
  {
    exact: true,
    path: '/',
    component: () => <Redirect to="/home" />
  },
  {
    exact: true,
    path: '/404',
    component: lazy(() => import('src/views/pages/Error404View'))
  },
  {
    exact: true,
    guard: GuestGuard,
    path: '/login',
    component: lazy(() => import('src/views/auth/LoginView'))
  },
  // {
  //   path: '/app',
  //   guard: AuthGuard,
  //   layout: DesignLayout,
  //   routes: [
  //     {
  //       exact: true,
  //       path: '/app/stories/:storyId',
  //       component: lazy(() => import('src/views/stories/StoryEditView'))
  //     }
  //   ]
  // },
  {
    path: '/app',
    guard: AuthGuard,
    layout: DashboardLayout,
    routes: [
      {
        exact: true,
        path: '/app',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/reports',
        component: () => <Redirect to="/app/reports/dashboard" />
      },
      {
        exact: true,
        path: '/app/management/users',
        component: lazy(() => import('src/views/management/Users/UserListView'))
      },
      {
        exact: true,
        path: '/app/management/users/:userid',
        component: lazy(() => import('src/views/management/Users/UserEditView'))
      },
      {
        exact: true,
        path: '/app/management/sections',
        component: lazy(() => import('src/views/management/Sections/SectionListView'))
      },
      {
        exact: true,
        path: '/app/management/sections/:sectionid',
        component: lazy(() => import('src/views/management/Sections/SectionEditView'))
      },
      {
        exact: true,
        path: '/app/stories',
        component: lazy(() => import('src/views/stories/StoryListView'))
      },
      {
        exact: true,
        path: '/app/stories/:storyId',
        component: lazy(() => import('src/views/stories/StoryEditView'))
      },
      {
        exact: true,
        path: '/app/fronts',
        component: lazy(() => import('src/views/fronts/FrontListView'))
      },
      {
        exact: true,
        path: '/app/fronts/:frontId',
        component: lazy(() => import('src/views/fronts/FrontEditView'))
      },


      {
        exact: true,
        path: '/app/account',
        component: lazy(() => import('src/views/pages/AccountView'))
      },
      {
        exact: true,
        path: '/app/reports/dashboard',
        component: lazy(() => import('src/views/reports/DashboardView'))
      },



      {
        component: () => <Redirect to="/404" />
      }
    ]
  },
  {
    path: '*',
    layout: MainLayout,
    routes: [
      {
        exact: true,
        path: '/home',
        component: HomeView
      },
      {
        component: () => <Redirect to="/404" />
      }
    ]
  }
];

const renderRoutes = (routes) => (routes ? (
  <Suspense fallback={<LoadingScreen />}>
    <Switch>
      {routes.map((route, i) => {
        const Guard = route.guard || Fragment;
        const Layout = route.layout || Fragment;
        const Component = route.component;

        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            render={(props) => (
              <Guard>
                <Layout>
                  {route.routes
                    ? renderRoutes(route.routes)
                    : <Component {...props} />}
                </Layout>
              </Guard>
            )}
          />
        );
      })}
    </Switch>
  </Suspense>
) : null);

function Routes() {
  return renderRoutes(routesConfig);
}

export default Routes;
