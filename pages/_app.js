import Layout from "../components/Layout";
import { AuthContextProvider } from "../context/AuthContextProvider";
import { CartContextProvider } from "../context/CartContextProvider";
import { DeviceContextProvider } from "../context/DeviceContextProvider";
import { UserContextProvider } from "../context/UserContextProvider";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <AuthContextProvider>
      <DeviceContextProvider>
        <CartContextProvider>
          <UserContextProvider>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </UserContextProvider>
        </CartContextProvider>
      </DeviceContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
