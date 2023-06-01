export interface ENV {
  apiEndPoint: string;
  theme: string;
  appLanguage: string;
  isDevMode: boolean;
  tinyMCEApiKey: string | undefined;
  baseCmsDomain: string;
  baseWebDomain: string;
  tbusSupportEmail: string;
}
const env: ENV = {
  apiEndPoint: import.meta.env.VITE_APP_API_END_POINT || '',
  theme: import.meta.env.VITE_APP_THEME || 'light',
  appLanguage: import.meta.env.VITE_APP_LANGUAGE || 'en',
  isDevMode: import.meta.env.DEV,
  tinyMCEApiKey: import.meta.env.VITE_APP_TINY_MCE_API_KEY,
  baseCmsDomain: import.meta.env.VITE_APP_BASE_CMS_DOMAIN,
  baseWebDomain: import.meta.env.VITE_APP_BASE_WEB_DOMAIN,
  tbusSupportEmail: import.meta.env.VITE_APP_TBUS_SUPPORT_EMAIL,
};

export default env;
