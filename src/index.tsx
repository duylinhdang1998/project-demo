import 'antd/lib/dropdown/style/css';
import { GlobalProvider } from 'context/GlobalContext';
import 'index.css';
import 'locales/i18n';
import App from './App';
import reportWebVitals from './reportWebVitals';
import ReactDOM from 'react-dom';

ReactDOM.render(
  <GlobalProvider>
    <App />
  </GlobalProvider>,
  document.getElementById('root') as HTMLElement,
);

// const container = document.getElementById('root') as HTMLElement;
// const root = createRoot(container);

// root.render(
//   <GlobalProvider>
//     <App />
//   </GlobalProvider>,
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
