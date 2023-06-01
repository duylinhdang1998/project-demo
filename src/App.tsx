import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { LoadingScreen } from 'components/LoadingScreen/LoadingScreen';
import { useGlobalContext } from 'context/GlobalContext';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Provider } from 'react-redux';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PersistGate } from 'redux-persist/lib/integration/react';
import { getRoutes } from 'routes/routes';
import { persistor, store } from 'store/configureStore';
import myTheme from 'theme/theme';

export const router = createBrowserRouter(getRoutes());

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
      <ToastContainer autoClose={2000} closeButton draggable hideProgressBar={false} position="top-right" style={{ minWidth: '375px' }} />
    </ThemeProvider>
  );
};
const AppWithRedux = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen />} persistor={persistor}>
        <App />
      </PersistGate>
    </Provider>
  );
};

export default AppWithRedux;
