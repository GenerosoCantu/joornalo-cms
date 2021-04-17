import React, {
  lazy,
  Suspense
} from 'react';
import {
  Switch,
  Redirect,
  Route
} from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import HomeView from 'src/views/pages/HomeView';
import LoadingScreen from 'src/components/LoadingScreen';
import AuthRoute from 'src/components/AuthRoute';
import GuestRoute from 'src/components/GuestRoute';

function Routes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Switch>
        <Redirect
          exact
          from="/"
          to="/home"
        />
        <Route
          exact
          path="/404"
          component={lazy(() => import('src/views/pages/Error404View'))}
        />
        <GuestRoute
          exact
          path="/login"
          component={lazy(() => import('src/views/auth/LoginView'))}
        />
        <AuthRoute
          path="/app"
          render={(props) => (
            <DashboardLayout {...props}>
              <Suspense fallback={<LoadingScreen />}>
                <Switch>
                  <Redirect
                    exact
                    from="/app"
                    to="/app/reports/dashboard"
                  />
                  <Route
                    exact
                    path="/app/reports/dashboard"
                    component={lazy(() => import('src/views/reports/DashboardView'))}
                  />onent={lazy(() => import('src/views/reports/DashboardAlternativeView'))}
                  <Redirect
                    exact
                    from="app/reports"
                    to="/app/reports/dashboard"
                  />
                  <Redirect to="/404" />
                </Switch>
              </Suspense>
            </DashboardLayout>
          )}
        />

        <Route
          path="*"
          render={(props) => (
            <MainLayout {...props}>
              <Switch>
                <Route
                  exact
                  path="/home"
                  component={HomeView}
                />
                <Redirect to="/404" />
              </Switch>
            </MainLayout>
          )}
        />
        <Redirect to="/404" />
      </Switch>
    </Suspense>
  );
}

export default Routes;
