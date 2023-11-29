import { Outlet } from "react-router";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
