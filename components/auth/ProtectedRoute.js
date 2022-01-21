import { useRouter } from "next/router";
const protectedRoute = (WrappedComponent) => {
  return (props) => {
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const router = useRouter();

      const accessToken = localStorage.getItem("access_token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    }

    // If we are on server, return null
    return null;
  };
};

export default protectedRoute;

export const isUserLogged = () => {
  if (typeof window !== "undefined" && localStorage.getItem("access_token")) return true;
  else return false;
};
