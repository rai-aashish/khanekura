import {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react/cjs/react.production.min";
import { userApi } from "../helpers/axios";
import { AuthContext } from "./AuthContextProvider";
export const CartContext = createContext();

export const CartContextProvider = ({ children }) => {
  const [cartData, setCartData] = useState(null);
  const user = useContext(AuthContext);

  let access_token = null;
  if (typeof window !== "undefined") {
    access_token = localStorage.getItem("access_token");
  }

  useEffect(() => {
    if (access_token) {
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
  }, [access_token]);

  return (
    <CartContext.Provider value={[cartData, setCartData]}>
      {children}
    </CartContext.Provider>
  );
};
