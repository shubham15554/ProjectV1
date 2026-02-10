import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = () => {
  return (
    <div className="h-25  bg-[#000000] flex items-center justify-between p-6">
      <div className="flex items-center justify ">
        <NavLink className='flex items-center justify-center' to="/">
        <img className="h-30 w-30 " src="../../src/assets/Images/sellogo.png" alt="" />
          <h1  className="text-[#031b38] text-3xl font-bold">
            Lex<span className="text-[#dbaa2f] textl-3xl font-semibold">Bridge</span>
          </h1>
        </NavLink>
      </div>
      <div className="flex gap-8 p-6 items-center">
        <NavLink
          className={({ isActive }) =>
            `text-l font-bold ${
              isActive ? "text-[#0e3e79]" : "text-white"
            } `
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? `text-[#0e3e79]` : `text-white`}`
          }
          to="/mentors"
        >
          Mentors
        </NavLink><NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? `text-[#0e3e79]` : `text-white`}`
          }
          to="/myBookings"
        >
          My Bookings
        </NavLink>

        <NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? `text-[#0e3e79]` : `text-white`}`
          }
          to="/about"
        >
          About Us
        </NavLink>
        <NavLink to="/signin">
          <button className="text-l text-white font-medium bg-[#0e3e79] rounded px-6 py-2 cursor-pointer active:scale-95">
            SignIn
          </button>
        </NavLink>
      </div>
    </div>
  );
};

export default NavBar;
