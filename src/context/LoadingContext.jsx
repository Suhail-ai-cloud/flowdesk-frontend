import React, { createContext, useState, useEffect } from "react";
import { setLoader } from "../utils/loader";

export const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoader(setLoading);
  }, []);

  return (
    <LoadingContext.Provider value={{ loading, setLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};