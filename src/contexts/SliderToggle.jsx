import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { FiMoon, FiSun } from 'react-icons/fi';
import './SliderToggle.css';
import '../App.css';
import { ThemeContext } from './Theme.context';

const SliderToggle = ({ className }) => {
  const { toggleTheme, theme } = useContext(ThemeContext);

  return (
    <div className="relative flex w-fit items-center rounded-full">
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10 ${
          theme === 'light' ? 'active' : ''
        } ${className}`}
        onClick={() => toggleTheme()}
      >
        <FiMoon className="relative z-10 text-xl md:text-lg" />
        <span className="relative z-10">Light</span>
      </button>
      <button
        className={`text-sm font-medium flex items-center gap-2 px-3 md:pl-3 md:pr-3.5 py-3 md:py-1.5 transition-colors relative z-10 ${
          theme === 'dark' ? 'active' : ''
        } ${className}`}
        onClick={() => toggleTheme()}
      >
        <FiSun className="relative z-10 text-xl md:text-lg" />
        <span className="relative z-10">Dark</span>
      </button>
      <div
        className={`absolute inset-0 z-0 flex ${
          theme === 'dark' ? 'justify-end' : 'justify-start'
        }`}
      >
        <motion.span
          layout
          transition={{ type: 'spring', damping: 15, stiffness: 250 }}
          className="h-full w-1/2 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600"
        />
      </div>
    </div>
  );
};

export default SliderToggle;




// import { motion } from "framer-motion";
// import { useState } from "react";
// import { FiMoon, FiSun } from "react-icons/fi";
// import './SliderToggle.css'

// const SliderToggle = ({ className }) => {
//   const [selected, setSelected] = useState("light");

//   return (
//     <div className={`slider-toggle ${className}`}>
//       <button
//         className={`slider-toggle__button slider-toggle__button--light ${selected === 'light' ? 'slider-toggle__button--active' : ''}`}
//         onClick={() => {
//           setSelected("light");
//         }}
//       >
//         <FiMoon className="slider-toggle__icon" />
//         <span className="slider-toggle__label">Light</span>
//       </button>
//       <button
//         className={`slider-toggle__button slider-toggle__button--dark ${selected === 'dark' ? 'slider-toggle__button--active' : ''}`}
//         onClick={() => {
//           setSelected("dark");
//         }}
//       >
//         <FiSun className="slider-toggle__icon" />
//         <span className="slider-toggle__label">Dark</span>
//       </button>
//       <div
//         className={`slider-toggle__background slider-toggle__background--${selected}`}
//       >
//         <motion.span
//           layout
//           transition={{ type: "spring", damping: 15, stiffness: 250 }}
//           className="slider-toggle__background-fill"
//         />
//       </div>
//     </div>
//   );
// };

// export default SliderToggle;








