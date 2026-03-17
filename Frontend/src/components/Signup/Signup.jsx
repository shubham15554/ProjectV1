import React, { useState, useContext } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext.jsx";
import { toast } from "react-toastify";
import 'remixicon/fonts/remixicon.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  let {handleRegister } = useContext(AuthContext);
  
  let Navigate = useNavigate();
  

  const handleOnClick = async (e) => {
    try {
      e.preventDefault();
      let msg = await handleRegister(username, email, password);
      toast("user signed up successfully", { theme: "dark" });
      Navigate('/');

    } catch (e) {
      console.log(e.response.data.message);
      toast.error(e.response.data.message, { theme: "dark" });
    }
  };

  return (
    <div className="main min-h-screen w-full bg-[#000000] select-none flex items-center justify-center p-4 relative overflow-x-hidden">
      
      {/* CROSS SIGN - Home par jane ke liye */}
      <div 
        onClick={() => navigate("/")} 
        className="absolute top-5 right-5 text-white text-3xl cursor-pointer z-10 hover:text-gray-400 transition-all"
      >
        <i className="ri-close-line"></i>
      </div>

      <div className="bg-[#0F0F0F] rounded-xl flex flex-col justify-center items-center p-6 w-full max-w-[400px] my-10">
        
        {/* LOGO */}
        <div className="logo flex items-center justify-center mb-6">
          <h1 style={{ WebkitTextStroke: "0.5px white" }} className="text-[#162942] text-4xl font-bold">
            Lex <span className="text-[#AE8623] font-semibold">Bridge</span>
          </h1>
        </div>

        {/* WELCOME TEXT */}
        <div className="flex flex-col gap-1 text-center mb-6">
          <h1 className="text-2xl text-white font-semibold">Join Us</h1>
          <p className="text-sm text-[#c7c2c2] font-medium">Create an account to get started</p>
        </div>

        {/* GOOGLE BUTTON */}
        <div className="w-full flex flex-col gap-4">
          <div className="w-full h-12 bg-[#181A1B] text-white flex gap-4 items-center justify-center rounded cursor-pointer active:scale-95 transition-all">
            <img className="w-5 h-5" src="/google.png" alt="google" />
            <h1 className="font-normal text-sm">Sign up with Google</h1>
          </div>

          {/* DIVIDER */}
          <div className="flex items-center gap-2 my-2">
            <div className="h-[1px] bg-gray-800 flex-1"></div>
            <p className="text-gray-500 text-xs uppercase font-bold">or</p>
            <div className="h-[1px] bg-gray-800 flex-1"></div>
          </div>
        </div>

        {/* FORM SECTION */}
        <div className="text-white w-full">
          <form className="w-full" onSubmit={handleOnClick}>
            
            {/* EMAIL */}
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-sm font-medium text-white">Email Address</h1>
              <input
                className="w-full h-11 bg-[#181A1B] rounded text-sm text-white font-medium p-3 shadow-sm shadow-[#5a5656] outline-none"
                type="email"
                placeholder="johndoe123@gmail.com"
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* NAME */}
            <div className="flex flex-col gap-2 mt-4">
              <h1 className="text-sm font-medium text-white">Full Name</h1>
              <input
                className="w-full h-11 bg-[#181A1B] rounded text-sm text-white font-medium p-3 shadow-sm shadow-[#5a5656] outline-none"
                type="text"
                placeholder="John Doe"
                onChange={(e) => setUserName(e.target.value)}
                required
              />
            </div>

            {/* PASSWORD */}
            <div className="flex flex-col gap-2 w-full mt-4">
              <h1 className="text-sm font-semibold text-white">Create Password</h1>
              <input
                className="w-full h-11 bg-[#181A1B] rounded text-sm text-white font-medium p-3 shadow-sm shadow-[#5a5656] outline-none"
                type="password"
                placeholder="Create password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              {/* REGISTER BUTTON */}
              <button className="w-full py-3 bg-blue-700 hover:bg-blue-600 transition-colors rounded text-white text-base font-semibold mt-6 cursor-pointer active:scale-95">
                Create Account
              </button>

              {/* REDIRECT TO LOGIN */}
              <h1 className="text-gray-500 font-medium text-sm text-center mt-6">
                Already have an account?{" "}
                <NavLink to="/signin" className="text-blue-600 font-semibold hover:underline">
                  Login Here
                </NavLink>
              </h1>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;