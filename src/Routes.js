/* eslint-disable react/no-array-index-key */
import React, {
  lazy,
  Suspense,
  Fragment
} from 'react';
import {
  Routes,
  Navigate,
  Route,
  RouterProvider,
  createBrowserRouter,
  useLocation,
  Outlet
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoginView from 'src/views/auth/LoginView';
import DashboardView from 'src/views/reports/DashboardView'
import UserListView from 'src/views/management/Users/UserListView'

import LoadingScreen from 'src/components/LoadingScreen';
import AuthGuard from 'src/components/AuthGuard';
import GuestGuard from 'src/components/GuestGuard';

// const renderRoutes = (routes) => (routes ? (
//   <Suspense fallback={<LoadingScreen />}>
//     <Routes>
//       {routes.map((route, i) => {
//         const Guard = route.guard || Fragment;
//         const Layout = route.layout || Fragment;
//         const Component = route.component;

//         return (
//           <Route
//             key={i}
//             path={route.path}
//             exact={route.exact}
//             render={(props) => (
//               <Guard>
//                 <Layout>
//                   {route.routes
//                     ? renderRoutes(route.routes)
//                     : <Component {...props} />}
//                 </Layout>
//               </Guard>
//             )}
//           />
//         );
//       })}
//     </Routes>
//   </Suspense>
// ) : null);


const renderRoutes = (routes) => (routes ? (
  <>
    {/* <Route path="/" element={<div>yes...</div>} />
      <Route path="/home" element={<MainLayout><HomeView /></MainLayout>} />
      <Route path="/app/:tenant/home" element={<MainLayout><HomeView /></MainLayout>} />
      <Route path='/app/:tenant/login' element={<GuestGuard><LoginView /></GuestGuard>} />
      <Route path='/app/:tenant' element={<AuthGuard><DashboardView /></AuthGuard>} />
      <Route path='/app/:tenant/dashboard' element={<AuthGuard><DashboardLayout><DashboardView /></DashboardLayout></AuthGuard>} /> */}

    {routes.map((route, i) => {
      console.log('route--->', route)
      const Guard = route.guard || Fragment;
      const Layout = route.layout || Fragment;
      const Component = route.component || Outlet;

      // if (route.routes)
      return (
        <Route
          key={i}
          path={route.path}
          element={
            <Guard>
              <Layout>
                <Component />
              </Layout>
            </Guard>
          }
        >
          {route.routes && renderRoutes(route.routes)}
        </Route>
      )
      // else
      //   return (
      //     <Route
      //       key={i}
      //       path={route.path}
      //       element={
      //         <Guard>
      //           <Layout>
      //             <Component />
      //           </Layout>
      //         </Guard>
      //       }
      //     />
      //   );

    })}
  </>
) : null);

function AppRoutes() {

  let tenant = null;
  // const { pathname } = useLocation();
  // const params = pathname.split('/');

  // if (params[1] === 'app' && params[2]) {
  //   tenant = params[2]
  // }

  const routesConfig = [
    {
      path: '/',
      component: () => <Navigate to="/home" />
    },
    {
      path: `/app/:tenant/login`,
      guard: GuestGuard,
      component: () => <LoginView />
      // component: lazy(() => import('src/views/auth/LoginView'))
    },
    {
      path: '/app/:tenant',
      guard: AuthGuard,
      layout: DashboardLayout,
      routes: [
        {
          path: 'dashboard',
          component: lazy(() => import('src/views/reports/DashboardView'))
        },
        {
          path: 'management/users',
          component: lazy(() => import('src/views/management/Users/UserListView'))
        },
        {
          path: 'management/users/:userid',
          component: lazy(() => import('src/views/management/Users/UserEditView'))
        },
        {
          path: '/app/:tenant/management/sections',
          component: lazy(() => import('src/views/management/Sections/SectionListView'))
        },
        {
          path: '/app/:tenant/management/sections/:sectionid',
          component: lazy(() => import('src/views/management/Sections/SectionEditView'))
        },
        {
          exact: true,
          path: '/app/:tenant/stories',
          component: lazy(() => import('src/views/stories/StoryListView'))
        },
        {
          path: '/app/:tenant/stories/:storyId',
          component: lazy(() => import('src/views/stories/StoryEditView'))
        },
        {
          path: '/app/:tenant/fronts',
          component: lazy(() => import('src/views/fronts/FrontListView'))
        },
        {
          path: '/app/:tenant/fronts/:frontId',
          component: lazy(() => import('src/views/fronts/FrontEditView'))
        },
        {
          path: '/app/:tenant/account',
          component: lazy(() => import('src/views/pages/AccountView'))
        },
      ]
    }
  ];

  const routesConfigX = [
    {
      exact: true,
      path: '/',
      component: () => <Navigate to="/home" />
    },
    {
      exact: true,
      path: '/404',
      component: lazy(() => import('src/views/pages/Error404View'))
    },
    {
      exact: true,
      guard: GuestGuard,
      path: `/app/:tenant/login`,
      component: lazy(() => import('src/views/auth/LoginView'))
    },
    {
      path: '/app/:tenant',
      guard: AuthGuard,
      layout: DashboardLayout,
      routes: [
        {
          exact: true,
          path: '/app/:tenant',
          component: () => <Navigate to={`/app/${tenant}/dashboard`} />
        },
        {
          exact: true,
          path: '/app/:tenant/dashboard',
          component: lazy(() => import('src/views/reports/DashboardView'))
        },
        // {
        //   exact: true,
        //   path: '/app/:tenant/dashboard',
        //   component: lazy(() => import('src/views/reports/DashboardView'))
        // },
        // {
        //   exact: true,
        //   path: '/app/:tenant/reports/dashboard',
        //   component: lazy(() => import('src/views/reports/DashboardView'))
        // },
        {
          exact: true,
          path: '/app/:tenant/reports',
          component: () => <Navigate rect to={`/app/${tenant}/reports/dashboard`} />
        },
        {
          exact: true,
          path: '/app/:tenant/management/users',
          component: lazy(() => import('src/views/management/Users/UserListView'))
        },
        {
          exact: true,
          path: '/app/:tenant/management/users/:userid',
          component: lazy(() => import('src/views/management/Users/UserEditView'))
        },
        {
          exact: true,
          path: '/app/:tenant/management/sections',
          component: lazy(() => import('src/views/management/Sections/SectionListView'))
        },
        {
          exact: true,
          path: '/app/:tenant/management/sections/:sectionid',
          component: lazy(() => import('src/views/management/Sections/SectionEditView'))
        },
        {
          exact: true,
          path: '/app/:tenant/stories',
          component: lazy(() => import('src/views/stories/StoryListView'))
        },
        {
          exact: true,
          path: '/app/:tenant/stories/:storyId',
          component: lazy(() => import('src/views/stories/StoryEditView'))
        },
        {
          exact: true,
          path: '/app/:tenant/fronts',
          component: lazy(() => import('src/views/fronts/FrontListView'))
        },
        {
          exact: true,
          path: '/app/:tenant/fronts/:frontId',
          component: lazy(() => import('src/views/fronts/FrontEditView'))
        },
        {
          exact: true,
          path: '/app/:tenant/account',
          component: lazy(() => import('src/views/pages/AccountView'))
        },
        {
          component: () => <Navigate to="/404" />
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
          component: () => <Navigate to="/404" />
        }
      ]
    }
  ];

  // const routerx = createBrowserRouter([
  //   {
  //     path: '/',
  //     element: <MainLayout><HomeView /></MainLayout>
  //   },
  //   {
  //     path: '/app/:tenant/home',
  //     element: <MainLayout><HomeView /></MainLayout>
  //   },
  //   {
  //     path: '/app/:tenant/login',
  //     element: <GuestGuard><LoginView /></GuestGuard>
  //   },
  //   {
  //     path: '/app/:tenant',
  //     element: lazy(() => import('src/views/reports/DashboardView'))
  //   }


  //   // path: '/app/:tenant',
  //   // component: () => <Navigate to={`/app/${tenant}/dashboard`} />
  // ]);
  // const routerZ = createBrowserRouter([
  //   {
  //     path: "/",
  //     element: <HomeView />,
  //     // errorElement: <ErrorPage />,
  //     children: [
  //       { path: '/app/:tenant/home', element: <HomeView /> },
  //       { path: '/app/:tenant/login', element: <LoginView /> },
  //     ],
  //   },
  // ]);

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        {renderRoutes(routesConfig)}
      </Routes>
    </Suspense>
  )
  // return (
  //   <RouterProvider router={routerZ} />
  // )
}

export default AppRoutes;
