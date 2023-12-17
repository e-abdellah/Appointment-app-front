import React from 'react';
import { Link } from 'react-router-dom';

const DropdownButton = ({ showDropdown, setShowDropdown, dropdownRef, buttonText, dropdownOptions, handleOptionClick }) => {
  const handleClick = (event) => {
    event.stopPropagation();
    setShowDropdown((prevState) => !prevState);
  };

  return (
    <div>
      <button type="button" className="app-navbar-sign__button" onClick={handleClick}>
        {buttonText}
      </button>
      {showDropdown && (
        <div className="app-navbar-sign__dropdown" ref={dropdownRef}>
          {dropdownOptions.map((option, index) => (
            <Link
              key={index}
              to={option.path}
              className="app-navbar-sign__dropdown-button"
              onClick={() => handleOptionClick(option.key)}
            >
              {option.text}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
