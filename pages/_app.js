import Layout from "../components/Layout";
import { CartContextProvider } from "../context/CartContextProvider";
import { DeviceContextProvider } from "../context/DeviceContextProvider";
import { UserContextProvider } from "../context/UserContextProvider";
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <DeviceContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </UserContextProvider>
      </CartContextProvider>
    </DeviceContextProvider>
  );
}

export default MyApp;
