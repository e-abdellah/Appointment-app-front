import React from "react";
import { FaSignInAlt } from "react-icons/fa";
import DarkMode from "./DarkMode";
import "../App.css";

const NavBar = () => {
  const navItems = ["About us", "Services", "Pricing", "Support"];

  return (
    <nav className="fixed w-full bg-slate-950 text-slate-100 flex justify-between p-4">
      <div className="flex gap-4">
        {navItems.map((item, index) => (
          <a key={index} href="#" className="hover:underline">
            {item}
          </a>
        ))}
      </div>
      <div className="flex items-center gap-4">
        <DarkMode /> {/* Include DarkMode component */}
        <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded inline-flex items-center">
          <FaSignInAlt className="mr-2" />
          Sign In
        </button>
      </div>
    </nav>
  );
};

export default NavBar;
