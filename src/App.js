import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import { create } from 'jss';
import rtl from 'jss-rtl';
import { SnackbarProvider } from 'notistack';
import {
  createStyles,
  ThemeProvider
} from '@mui/material';
import { makeStyles } from '@mui/styles';
import { StylesProvider, jssPreset } from '@mui/styles';
// import AdapterDateFns from '@mui/lab/AdapterDateFns';
// import LocalizationProvider from '@mui/lab/LocalizationProvider';

import Auth from 'src/components/Auth';
import CookiesNotification from 'src/components/CookiesNotification';
import SettingsNotification from 'src/components/SettingsNotification';
import GoogleAnalytics from 'src/components/GoogleAnalytics';
import ScrollReset from 'src/components/ScrollReset';
import Spinner from 'src/components/Spinner';
import useSettings from 'src/hooks/useSettings';
import { createTheme } from 'src/theme';
import AppRoutes from 'src/Routes';
import './i18n';

const history = createBrowserHistory();
const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

const useStyles = makeStyles(() => createStyles({
  '@global': {
    '*': {
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
    },
    html: {
      '-webkit-font-smoothing': 'antialiased',
      '-moz-osx-font-smoothing': 'grayscale',
      height: '100%',
      width: '100%'
    },
    body: {
      height: '100%',
      width: '100%'
    },
    '#root': {
      height: '100%',
      width: '100%'
    }
  }
}));

function App() {
  useStyles();

  const { settings } = useSettings();

  return (

    <ThemeProvider theme={createTheme(settings)}>

      <StylesProvider jss={jss}>
        {/* <LocalizationProvider dateAdapter={AdapterDateFns}> */}
        <SnackbarProvider maxSnack={1}>
          <BrowserRouter>
            {/* <AppRoutes> */}
            <Auth>
              <ScrollReset />
              <GoogleAnalytics />
              <CookiesNotification />
              <SettingsNotification />
              <Spinner />
              <AppRoutes />
            </Auth>
            {/* </AppRoutes> */}
          </BrowserRouter>
        </SnackbarProvider>
        {/* </LocalizationProvider> */}
      </StylesProvider>
    </ThemeProvider>
  );
}

export default App;
