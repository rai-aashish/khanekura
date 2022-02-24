import { useRouter } from "next/router";

const protectedRoute = (WrappedComponent) => {
  return (props) => {
    const router = useRouter();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const accessToken = localStorage.getItem("access_token");

      // If there is no access token we redirect to "/" page.
      if (!accessToken) {
        router.replace("/login");
        return null;
      }
      return <WrappedComponent {...props} />;
    } else return <></>;  
  };
};

export default protectedRoute;

export const isUserLogged = () => {
  if (typeof window !== "undefined" && localStorage.getItem("access_token"))
    return true;
  else return false;
};
