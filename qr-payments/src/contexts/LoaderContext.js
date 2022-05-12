import { createContext, useState } from "react";

export const LoaderContext = createContext();

function LoaderContextProvider(props) {
  const [isLoading, setIsLoading] = useState({
    state: false,
    hideApp: true,
  });

  return (
    <LoaderContext.Provider value={{ isLoading, setIsLoading }}>
      {props.children}
    </LoaderContext.Provider>
  );
}

export default LoaderContextProvider;
