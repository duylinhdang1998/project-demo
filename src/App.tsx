import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useGlobalContext } from 'context/GlobalContext';
import useAuthStore from 'pages/LoginPage/store/auth';
import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useRoutes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getRoutes } from 'routes/routes';
import myTheme from 'theme/theme';
import { PersistGate } from 'zustand-persist';

function App() {
  const { i18n } = useTranslation();
  const { language } = useGlobalContext();
  const elements = useRoutes(getRoutes(useAuthStore.getState().userInfo?.role ?? ''));

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [i18n, language]);
  return (
    <PersistGate>
      <ThemeProvider theme={myTheme}>
        <CssBaseline />
        <div className="App">{elements}</div>
        <ToastContainer autoClose={3500} closeButton draggable hideProgressBar position="top-right" style={{ minWidth: '375px' }} />
      </ThemeProvider>
    </PersistGate>
  );
}

export default App;
