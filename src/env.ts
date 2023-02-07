export interface ENV {
  apiEndPoint: string;
  isDevMode: boolean;
}

const env: ENV = {
  apiEndPoint: process.env.REACT_APP_API_END_POINT || "",
  isDevMode: !process.env.NODE_ENV || process.env.NODE_ENV === "development",
};

export default env;
