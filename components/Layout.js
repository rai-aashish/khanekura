import Header from "./Header";
import Footer from "./Footer";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      {children}
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={true}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />
      <Footer />
    </>
  );
}
