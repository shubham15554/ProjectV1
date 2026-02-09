import React from "react";
import { NavLink } from "react-router-dom";
import 'remixicon/fonts/remixicon.css'

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-800 mt-10">
      <div className="flex flex-col md:flex-row items-center justify-between py-6 px-4 md:px-10 gap-8 md:gap-0">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center">
          <NavLink className="flex items-center justify-center" to="/">
            <img
              className="h-20 w-20 md:h-30 md:w-30" // Mobile par thoda chota kiya
              src="../../src/assets/Images/sellogo.png"
              alt="Logo"
            />
            <h1 className="text-[#031b38] text-2xl md:text-3xl font-bold">
              Lex
              <span className="text-[#dbaa2f] font-semibold">
                Bridge
              </span>
            </h1>
          </NavLink>
        </div>

        {/* Copyright - Mobile par p-10 hata kar responsive kiya */}
        <div className="text-white text-sm md:text-l text-center">
          <p>Copyright @2026 LEXBRIDGE Pvt.Ltd.<br/> All rights Reserved.</p>
        </div>

        {/* Social Icons */}
        <div className="text-white flex gap-8 text-2xl">
            <NavLink to="#"><i className="ri-instagram-line"></i></NavLink>
            <NavLink to="#"><i className="ri-facebook-circle-fill"></i></NavLink>
            <NavLink to="#"><i className="ri-twitter-x-line"></i></NavLink>
        </div>
      </div>
    </footer>
  );
};

export default Footer;