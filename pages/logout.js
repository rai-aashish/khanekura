import { useRouter } from "next/router";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContextProvider";

export default function Logout() {
  const router = useRouter();
  const [user, setUser] = useContext(UserContext);

  useEffect(() => {
    localStorage.removeItem("access_token");
    setUser({
      isLogged: false,
    });
    router.push("/login");
  }, []);
  return <div>Logging out..</div>;
}
