import React from "react";
import "./NavBar.css";
import { NavLink } from "react-router-dom";
import { FaSignInAlt, FaSearch } from "react-icons/fa";
import SliderToggle from "../SliderToggle"; // Import the SliderToggle component

const NavBar = () => {
  return (
    <div className="app-navbar">
      <div className="app-navbar-links">
        <div className="app-navbar-links__logo">
          <img src="../../../assets/imgs/logo.png" alt="logo" />
        </div>
        <div className="app-navbar-links__container">
          <NavLink to="/" className="app-navbar-links__container-link">
            Home
          </NavLink>
          <NavLink to="/services" className="app-navbar-links__container-link">
            Services
          </NavLink>
          <NavLink to="/doctors" className="app-navbar-links__container-link">
            Find a Doctor
          </NavLink>
          <NavLink to="/about" className="app-navbar-links__container-link">
            About Us
          </NavLink>
        </div>
      </div>
      <div className="app-navbar-sign">
        <p>Sign in</p>
        <button type="button">Sign Up</button>
      </div>
      <div className="app-navbar-toggle">
        <SliderToggle className="dark-mode-toggle" />
      </div>
    </div>
  );
};

export default NavBar;

// import React from "react";
// import { FaSignInAlt, FaSearch } from "react-icons/fa";
// import DarkMode from "../DarkMode";
// import "../../App.css";

// const NavBar = () => {
//   const navItems = ["About us", "Services", "Pricing", "Support"];
//   const [searchInput, setSearchInput] = React.useState('');

//   const handleSearchClick = () => {
//     console.log('Search input:', searchInput);
//     // Add search logic here
//   };

//   return (
//     <nav className="fixed w-full bg-slate-950 text-slate-100 flex justify-between p-4">
//       <div className="flex gap-4 nav-items" style={{ marginLeft: "8rem" }}>
//         {navItems.map((item, index) => (
//           <a key={index} href="#" className="hover:underline">
//             {item}
//           </a>
//         ))}
//       </div>
//       <div className="search-bar flex justify-between">
//         <input type="text" placeholder="Search..." className="search-input" value={searchInput} onChange={(e) => setSearchInput(e.target.value)} />
//         <button className="search-button" onClick={handleSearchClick}>
//           <FaSearch />
//         </button>
//       </div>
//       <div className="flex items-center gap-4">
//         <DarkMode /> {/* Include DarkMode component */}
//         <button className="bg-indigo-600 hover:bg-indigo-500 text-white py-2 px-4 rounded inline-flex items-center">
//           <FaSignInAlt className="mr-2" />
//           Sign In
//         </button>
//       </div>
//     </nav>
//   );
// };

// export default NavBar;
