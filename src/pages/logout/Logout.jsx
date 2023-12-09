import React, { useContext } from "react";
import { AuthContext } from "../../contexts/Auth.context";
import { Link } from "react-router-dom";
import "./Logout.css";

const Logout = () => {
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="logout">
      <h1 className="logout__title">Are you sure you want to logout?</h1>
      <Link to="/" onClick={handleLogout} className="logout__button">
        Logout
      </Link>
    </div>
  );
};

export default Logout;
