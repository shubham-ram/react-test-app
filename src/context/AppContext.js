import { createContext, useContext } from "react";

const AppContext = createContext(null);

const useAppContext = () => useContext(AppContext);

export { AppContext, useAppContext };
