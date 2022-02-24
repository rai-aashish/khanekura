import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { CartContext } from "../context/CartContextProvider";
import { AuthContext } from "../context/AuthContextProvider";

export default function logout() {
  const router = useRouter();
  const userOptions = useContext(AuthContext);
  const [user, setUser] = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);

  useEffect(() => {
    localStorage.removeItem("access_token");
    userOptions.logout();
    setCartData(null);
    setUser({
      isLogged: false,
    });
    router.push("/login");
  }, []);
  return <div></div>;
}
