import React from "react";
import "./navBar.css";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="app__navbar">
      <div className="app__navBar-links">
        <div className="app__navBar-links_logo">
          <img src="../../../assets/imgs/logo.png" alt="logo" />
        </div>
        <div className="app__navBar-links_container">
          <NavLink to="/" className="app__navBar-links_container_link">
            Home
          </NavLink>
          <NavLink to="/services" className="app__navBar-links_container_link">
            Services
          </NavLink>
          <NavLink
            to="/findADoctor"
            className="app__navBar-links_container_link"
          >
            Find a Doctor
          </NavLink>
          <NavLink to="/about" className="app__navBar-links_container_link">
            About Us
          </NavLink>
        </div>
      </div>
      <div className="app__navBar-sign">
        <p>Sign in</p>
        <button type="button">Sign Up</button>
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
