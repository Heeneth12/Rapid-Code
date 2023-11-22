import React from "react";
import logo from "../images/pic.png";
const NavBar = () => {
  return (
    <nav className="bg-gray-800 p-3">
      <div className="container mx-auto flex justify-center items-center">
        <img src={logo} alt="Logo" className="h-8 w-8 mr-2" />  {/* Adjust the height, width, and margin as needed */}
        <div className="text-white font-bold text-xl">Rapid Code Hub</div>
      </div>
    </nav>
  );
};

export default NavBar;
