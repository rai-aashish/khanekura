import { createContext, useState, useEffect } from "react";
import { userApi } from "../helpers/axios";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);

  let access_token = null;
  if (typeof window !== "undefined") {
    access_token = localStorage.getItem("access_token");
  }

  useEffect(() => {
    if (access_token) {
      const fetchData = async () => {
        const res = await userApi.get("cart");
        if (res) {
          setCartData(res.data.data)
        }
      };

      fetchData();
    }
  }, [access_token]);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
};
