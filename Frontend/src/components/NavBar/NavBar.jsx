import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { ImageOff, Menu, X } from "lucide-react"; // Menu icons ke liye
import { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { toast } from "react-toastify";
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  let {user , handleLogout} = useContext(AuthContext);


  let handleOnClick = async()=>{
    let res =  await handleLogout();
    console.log(res);
    toast(res.data.message , { theme: "dark" });
  }
  return (
    // Padding p-6 aur height h-25 wahi rakhi hai jo aapne di thi
    <div className="h-25 bg-[#000000] flex items-center justify-between p-6 relative">
      
      {/* Logo Section - No Changes */}
      <div className="flex items-center justify">
        <NavLink className='flex items-center justify-center' to="/">
          <img className="h-30 w-30" src="../../src/assets/Images/sellogo.png" alt="Logo" />
          <h1 className="text-[#031b38] text-3xl font-bold">
            Lex<span className="text-[#dbaa2f] text-3xl font-semibold">Bridge</span>
          </h1>
        </NavLink>
      </div>

      {/* Desktop Links - hidden on mobile (hidden), original flex on desktop (md:flex) */}
      <div className="hidden md:flex gap-8 p-6 items-center">
        <NavLink
          className={({ isActive }) =>
            `text-l font-bold ${isActive ? "text-[#0e3e79]" : "text-white"}`
          }
          to="/"
        >
          Home
        </NavLink>
        <NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? "text-[#0e3e79]" : "text-white"}`
          }
          to="/mentors"
        >
          Mentors
        </NavLink>
        
        { user &&  <NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? `text-[#0e3e79]` : `text-white`}`
          }
          to="/myBookings"
        >
          My Bookings
        </NavLink>
        }
        <NavLink
          className={({ isActive }) =>
            `text-l font-semibold ${isActive ? "text-[#0e3e79]" : "text-white"}`
          }
          to="/about"
        >
          About Us
        </NavLink>
        { !user && <NavLink to="/signin">
          <button className="text-l text-white font-medium bg-[#0e3e79] rounded px-6 py-2 cursor-pointer active:scale-95">
            SignIn
          </button>
        </NavLink>}

        {user && 
          <button onClick={handleOnClick}  className="text-l text-white font-medium bg-[#0e3e79] rounded px-6 py-2 cursor-pointer active:scale-95">
            Logout
          </button>
         }
      </div>

      {/* Mobile Toggle Button - Sirf mobile par dikhega */}
      <div className="md:hidden flex items-center">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white outline-none">
          {isOpen ? <X size={35} /> : <Menu size={35} />}
        </button>
      </div>

      {/* Mobile Menu - 'absolute' rakha hai taaki niche ke elements na hilen */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-[#000000] flex flex-col items-center gap-4 py-6 z-50 md:hidden border-t border-gray-800">
          <NavLink onClick={() => setIsOpen(false)} className="text-white text-lg" to="/">Home</NavLink>
          <NavLink onClick={() => setIsOpen(false)} className="text-white text-lg" to="/mentors">Mentors</NavLink>
          <NavLink onClick={() => setIsOpen(false)} className="text-white text-lg" to="/about">About Us</NavLink>
          <NavLink onClick={() => setIsOpen(false)} to="/signin">
            <button className="text-white bg-[#0e3e79] rounded px-8 py-2">SignIn</button>
          </NavLink>
        </div>
      )}
    </div>
  );
};

export default NavBar;