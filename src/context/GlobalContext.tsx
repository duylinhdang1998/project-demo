import env from "env";
import React, { createContext, useContext, useEffect, useReducer } from "react";

interface IProps {
  children: React.ReactNode;
}
const defaultFnc = () => console.log("");

interface IContext {
  modeTheme: string;
  language: string;
  setModeTheme: (mode: string) => void;
  setLanguage: (language: string) => void;
}

interface IAction {
  type: string;
  payload: any;
}

const initialState: IContext = {
  modeTheme: env.theme,
  language: env.appLanguage,
  setModeTheme: defaultFnc,
  setLanguage: defaultFnc,
};

console.log({ initialState });

const GlobalContext = createContext<IContext>(initialState);

const reducer = (state: IContext, { type, payload }: IAction) => {
  switch (type) {
    case "SET_MODE_THEME": {
      return {
        ...state,
        modeTheme: payload,
      };
    }
    case "SET_LANGUAGE": {
      return {
        ...state,
        language: payload,
      };
    }
    default:
      return state;
  }
};

const GlobalProvider = ({ children }: IProps) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const _handleSetModeTheme = (mode: string) => {
    dispatch({
      type: "SET_MODE_THEME",
      payload: mode,
    });
  };

  const _handleChangeLanguage = (language: string) => {
    dispatch({
      type: "SET_LANGUAGE",
      payload: language,
    });
    localStorage.setItem("language", language);
  };

  useEffect(() => {
    const language = localStorage.getItem("language");
    _handleChangeLanguage(language ?? state.language);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        setModeTheme: _handleSetModeTheme,
        setLanguage: _handleChangeLanguage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

const useGlobalContext = () => useContext(GlobalContext);

export { GlobalContext, GlobalProvider, useGlobalContext };
