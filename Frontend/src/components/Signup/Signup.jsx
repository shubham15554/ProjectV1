import React from "react";
import { useState } from "react";
import {NavLink} from 'react-router-dom'
import axios from 'axios';
import { AuthContext } from "../context/authContext.jsx";
import { useContext } from "react";
import { toast } from "react-toastify";
const SignIn = () => {
  

  let [username , setUserName] = useState();
  let [email , setEmail] = useState();
  let [password , setPassword] = useState();
  

  let {handleRegister } = useContext(AuthContext);
  
  

  const handleOnClick = async (e)=>{
     
    try{
      e.preventDefault();
      let msg = await handleRegister(username , email , password);
      console.log(msg);
      toast(msg , {theme: "dark"});
    }
    catch(e){
      console.log(e.response.data.message);
      toast.error(e.response.data.message , {theme: "dark" })
    }
  }




  return (
    <div className="main h-screen w-screen bg-[#000000] select-none flex items-center justify-center p-10">
      <div className=" bg-[#0F0F0F] rounded flex flex-col justify-center items-center p-4">
        <div className=" logo flex items-center justify-center p-4">
          <h1 style={{ WebkitTextStroke: "0.5px white" }} className="text-[#162942] text-3xl font-bold">
            Lex<span style={{ WebkitTextStroke: "0.5px white" }} className="text-[#AE8623] textl-3xl font-semibold">Bridge</span>
          </h1>
        </div>

        <div className="  flex gap-2 flex-col text-center">
          <h1 className="text-2xl text-white font-semibold ">Welcome Back</h1>
          <p className="text-l text-[#c7c2c2] font-medium">
            Login to manage your account
          </p>
        </div>

        <div className="p-2 flex flex-col gap-4 text-center">
          <div className="w-100 h-12 bg-[#181A1B] text-white flex gap-4 items-center justify-center rounded cursor-pointer active:scale-98 mt-4">
            <img
              className="w-6 h-6"
              src="../../src/assets/Images/google.png"
              alt=""
            />
            <h1 className="font-normal text-l">Sign in with Google</h1>
          </div>
          <div className="flex text-white mt-2">
            <div className="h-1 w-40">----------------------</div>
            <p className="pl-3">or</p>
            <div className="h-1 w-60">----------------------------</div>
          </div>
        </div>

        <div className="text-white flex flex-col gap-4 ">
          <form className="text-[#444242]" onSubmit={handleOnClick}>
          <div className="flex flex-col gap-2">
            <h1 className="text-l font-medium text-white">Email Address</h1>       
              <input
                className="w-100 h-10 bg-[#181A1B] rounded text-[15px] text-white font-medium p-4 shadow-xs shadow-[#5a5656]"
                type="text"
                placeholder="johndoe123@gmail.com"
                onChange={(e)=>setEmail(e.target.value)}
              />
          </div>
          <div className="flex flex-col gap-2 mt-2">
            <h1 className="text-l font-medium text-white">Name</h1>       
              <input
                className="w-100 h-10 bg-[#181A1B] rounded text-[15px] text-white font-medium p-4 shadow-xs shadow-[#5a5656]"
                type="text"
                placeholder="John Doe"
                onChange={(e)=>setUserName(e.target.value)}
              />
          </div>
          <div className="flex flex-col gap-2 w-100 mt-2">
              <h1 className="text-l font-semibold text-white">Create Password</h1>
              <input
                className="w-100 h-10 bg-[#181A1B] rounded text-[15px] text-white font-medium p-4 shadow-xs shadow-[#5a5656]"
                type="text"
                placeholder="Create password"
                onChange={(e)=>setPassword(e.target.value)}
              />

            <button className="px-30 py-2 bg-blue-700 rounded text-white text-l font-semibold mt-4 cursor-pointer ">
              Create Account
            </button>

            <h1 className="text-gray-600 font-medium text-l text-center">
                Already have an account?{" "}
              <span className="text-l font-semibold text-blue-600 cursor-pointer ">
              <NavLink to="/signin">Login Here</NavLink> 
              </span>
            </h1>
          </div>
          </form>
        </div>        
      </div>
    </div>
  );
};

export default SignIn;
