import { createContext } from "react";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const user = {
    access_token:
      typeof window !== "undefined" && localStorage.getItem("access_token")
        ? localStorage.getItem("access_token")
        : "",
    logout() {
      this.access_token = "";
    },
    setData(access_token) {
      this.access_token = access_token;
    },
    
  };

  return <AuthContext.Provider value={user}>{children}</AuthContext.Provider>;
};
