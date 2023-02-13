import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useGlobalContext } from 'context/GlobalContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getRoutes } from 'routes/routes';
import { persistor, store } from 'store/configureStore';
import myTheme from 'theme/theme';

const router = createBrowserRouter(getRoutes());

const App = () => {
  const { i18n } = useTranslation();
  const { language } = useGlobalContext();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  return (
    <ThemeProvider theme={myTheme}>
      <CssBaseline />
      <div className="App">
        <RouterProvider router={router} />
      </div>
      <ToastContainer autoClose={3500} closeButton draggable hideProgressBar position="top-right" style={{ minWidth: '375px' }} />
    </ThemeProvider>
  );
};
const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<div />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWithRedux;
