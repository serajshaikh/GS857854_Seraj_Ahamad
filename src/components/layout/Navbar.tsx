

import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import logo from "../../assets/logo.svg";

const Navbar = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleAuthToggle = () => {
    setIsSignedIn(!isSignedIn);
    setIsDropdownOpen(false);
  };

  return (
    <nav className="bg-white border-b-0 px-4 flex items-center justify-between">
      {/* Left Side - Logo */}
      <div className="flex items-center">
        <img src={logo} alt="Company Logo" className="h-12 w-auto mr-2" />
      </div>

      {/* Middle Title */}
      <div className="flex items-center">
        <span className="text-2xl font-semibold">Data Viewer App</span>
      </div>

      {/* Right Side - User Icon */}
      <div className="relative">
        <button
          className="flex items-center space-x-2 text-gray-600 text-xl focus:outline-none"
          onClick={toggleDropdown}
        >
          <FaRegUserCircle className="h-8 w-8" />
          <IoIosArrowDown className="h-5 w-5" />
        </button>

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg py-2">
            <button
              onClick={handleAuthToggle}
              className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
            >
              {isSignedIn ? "Sign Out" : "Sign In"}
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
