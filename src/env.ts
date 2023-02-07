export interface ENV {
  apiEndPoint: string;
  theme: string;
  appLanguage: string;
  isDevMode: boolean;
}

const env: ENV = {
  apiEndPoint: process.env.REACT_APP_API_END_POINT || "",
  theme: process.env.REACT_APP_THEME || "light",
  appLanguage: process.env.REACT_APP_LANGUAGE || "en",
  isDevMode: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
};

export default env;
