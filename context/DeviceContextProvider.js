import { createContext, useState, useEffect } from "react";

export const DeviceContext = createContext();

export const DeviceContextProvider = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);

  function handleWindowSizeChange() {
    if (window.innerWidth <= 900) setIsMobile(true);
    else setIsMobile(false);
  }

  useEffect(() => {
    handleWindowSizeChange();
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);

  return (
    <DeviceContext.Provider value={[isMobile, setIsMobile]}>
      {children}
    </DeviceContext.Provider>
  );
};
