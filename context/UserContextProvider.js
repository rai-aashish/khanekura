import { createContext, useState, useEffect } from "react";
import { rssApi } from "../helpers/axios";
export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isLogged: false,
  });

  let access_token = null;
  if (typeof window !== "undefined") {
    access_token = localStorage.getItem("access_token");
  }

  useEffect(() => {
    if (access_token) {
      const fetchUser = async () => {
        const res = await rssApi.get("profile/show", {
          headers: {
            Authorization: access_token,
          },
        });
        if (res) {
          setUser({
            isLogged: true,
            data: res.data.data,
          });
        }
      };

      fetchUser();
    }
  }, [access_token]);

  return (
    <UserContext.Provider value={[user, setUser]}>
      {children}
    </UserContext.Provider>
  );
};
