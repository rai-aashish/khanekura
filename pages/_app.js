import Layout from "../components/Layout";
import { DeviceContextProvider } from "../context/DeviceContextProvider";
import { UserContextProvider } from "../context/UserContextProvider";
import "../styles/global.scss";
import { store } from "../redux/store";
import { Provider } from "react-redux";
import { ApiProvider } from "@reduxjs/toolkit/dist/query/react";
import { userApi } from "../redux/apiStore";

function MyApp({ Component, pageProps }) {
  return (
    <ApiProvider api={userApi}>
    <Provider store={store}>
        <DeviceContextProvider>
            <UserContextProvider>
              <Layout>
                <Component {...pageProps} />
              </Layout>
            </UserContextProvider>
        </DeviceContextProvider>
    </Provider>
    </ApiProvider>
  );
}

export default MyApp;
