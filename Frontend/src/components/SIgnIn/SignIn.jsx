import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../context/authContext";
import 'remixicon/fonts/remixicon.css';

const SignIn = () => {
  const navigate = useNavigate();
  let { handleLogin } = useContext(AuthContext);
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      let msg = await handleLogin(userEmail, userPassword);
      toast(msg, { theme: "dark" });
    } catch (e) {
      toast.error(e.response.data.msg, { theme: "dark" });
    }
  };

  return (
    // h-screen ki jagah min-h-screen taaki mobile par overflow na ho
    <div className="main min-h-screen w-full bg-[#000000] select-none flex items-center justify-center p-4 relative overflow-x-hidden">
      
      {/* CROSS SIGN */}
      <div 
        onClick={() => navigate("/")} 
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer z-10"
      >
        <i className="ri-close-line"></i>
      </div>

      {/* Main Card: w-100 hata kar w-full aur max-w-sm kiya */}
      <div className="bg-[#0F0F0F] rounded-xl flex flex-col justify-center items-center p-6 w-full max-w-[400px] my-10">
        
        <div className="logo flex items-center justify-center mb-6">
          <h1 style={{ WebkitTextStroke: "0.5px white" }} className="text-[#162942] text-4xl font-bold">
            Lex <span className="text-[#AE8623] font-semibold">Bridge</span>
          </h1>
        </div>

        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl text-white font-semibold">Welcome Back</h1>
          <p className="text-sm text-[#c7c2c2] font-medium">Login to manage your account</p>
        </div>

        {/* Google Login Button */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-12 bg-[#181A1B] text-white flex gap-4 items-center justify-center rounded cursor-pointer active:scale-95 shadow-sm">
            <img className="w-5 h-5" src="../../src/assets/Images/google.png" alt="" />
            <h1 className="font-normal text-sm">Sign in with Google</h1>
          </div>

          {/* OR Divider */}
          <div className="flex items-center gap-2 my-2">
            <div className="h-[1px] bg-gray-800 flex-1"></div>
            <p className="text-gray-500 text-xs uppercase font-bold">or</p>
            <div className="h-[1px] bg-gray-800 flex-1"></div>
          </div>
        </div>

        {/* Form Section */}
        <div className="text-white w-full">
          <form onSubmit={submitHandler} className="w-full">
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-sm font-medium text-white">Email Address</h1>
              <input
                onChange={(dets) => setUserEmail(dets.target.value)}
                className="w-full h-11 rounded text-sm text-white font-medium p-3 bg-[#181A1B] shadow-sm shadow-[#5a5656] outline-none"
                type="email"
                placeholder="johndoe123@gmail.com"
                value={userEmail}
              />
            </div>

            <div className="flex flex-col gap-2 w-full mt-4">
              <div className="flex items-center justify-between">
                <h1 className="text-sm font-semibold text-white">Password</h1>
                <h1 className="text-xs font-semibold text-blue-600 cursor-pointer">Forgot?</h1>
              </div>
              <input
                onChange={(dets) => setUserPassword(dets.target.value)}
                className="w-full h-11 rounded text-sm text-white font-medium p-3 bg-[#181A1B] shadow-sm shadow-[#5a5656] outline-none"
                type="password"
                placeholder="Enter password"
                value={userPassword}
              />

              <button className="w-full py-3 bg-blue-700 rounded text-white text-base font-semibold mt-6 cursor-pointer active:scale-95 shadow-lg shadow-blue-900/20">
                Login
              </button>

              <h1 className="text-gray-500 font-medium text-sm text-center mt-6">
                Don't have an account?{" "}
                <NavLink to="/signup" className="text-blue-600 font-semibold hover:underline">
                  Create New
                </NavLink>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;