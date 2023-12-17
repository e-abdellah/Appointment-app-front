import { Outlet } from "react-router";
import NavBar from "./navigation/NavBar";
import Footer from "./footer/Footer";

const Layout = () => {
  return (
    <div>
      <NavBar />
      <div style={{ height: "7.5vh" }}></div>
      <Outlet />
      <Footer />
    </div>
  );
};

export default Layout;
