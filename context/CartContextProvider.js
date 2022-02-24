import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { userApi } from "../helpers/axios";
import { AuthContext } from "./AuthContextProvider";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const user = useContext(AuthContext);

  useEffect(() => {
    if (user.access_token) {
      const fetchData = async () => {
        const res = await userApi.get("cart", {
          headers: {
            Authorization: user.access_token,
          },
        });
        if (res) {
          setCartData(res.data.data);
        }
      };

      fetchData();
    }
  }, []);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
};
