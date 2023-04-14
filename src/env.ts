export interface ENV {
  apiEndPoint: string;
  theme: string;
  appLanguage: string;
  isDevMode: boolean;
  tinyMCEApiKey: string | undefined;
}
const env: ENV = {
  apiEndPoint: import.meta.env.VITE_APP_API_END_POINT || '',
  theme: import.meta.env.VITE_APP_THEME || 'light',
  appLanguage: import.meta.env.VITE_APP_LANGUAGE || 'en',
  isDevMode: !import.meta.env.NODE_ENV || import.meta.env.NODE_ENV === 'development',
  tinyMCEApiKey: import.meta.env.VITE_APP_TINY_MCE_API_KEY,
};

export default env;
