export interface ENV {
  apiEndPoint: string;
  assetsEndPoint: string;
  root: string;
  pageTitle: string;
  tokenKey: string;

  isDevMode: boolean;
  demoAccountEmail?: string;
  demoAccountPassword?: string;
}

const cwd = process.cwd();
const root = __dirname.replace(`${cwd}`, '.');
const env: ENV = {
  apiEndPoint: process.env.REACT_APP_API_END_POINT || '',
  assetsEndPoint: process.env.REACT_APP_ASSETS_END_POINT || '',
  root,
  pageTitle: process.env.REACT_APP_PAGE_TITLE || '',
  tokenKey: process.env.REACT_APP_TOKEN_KEY || '',

  isDevMode: !process.env.NODE_ENV || process.env.NODE_ENV === 'development',
  demoAccountEmail: process.env.REACT_APP_DEMO_ACCOUNT_EMAIL,
  demoAccountPassword: process.env.REACT_APP_DEMO_ACCOUNT_PASSWORD,
};

export default env;
