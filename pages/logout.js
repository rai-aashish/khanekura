import { useRouter } from "next/router";
import { useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "../context/UserContextProvider";
import { CartContext } from "../context/CartContextProvider";

export default function logout() {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);
  const [cartData, setCartData] = useContext(CartContext);

  useEffect(() => {
    localStorage.removeItem("access_token");
    setCartData(null)
    setUser({
      isLogged: false,
    });
    router.push("/login");
  }, []);
  return <div></div>;
}
