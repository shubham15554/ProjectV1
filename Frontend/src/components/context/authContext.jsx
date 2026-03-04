import { Children } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import axios from "axios";



export const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
            
    let [user , setUser] = useState({});
    

    const handleRegister = async (username , email , password)=>{
        try{ 
            
            let res = await axios.post("https://projectv1-1.onrender.com/user/signup"  , {username , email , password},  { withCredentials: true });
            
            if(res.data.user){
                setUser(user);
                return res.data.message;
            }
        }
        catch(error)
        {
         throw error;
        }
    }


    const handleLogin = async (userEmail , userPassword)=>{

        try{ 
            
            let res = await axios.post("https://projectv1-1.onrender.com/user/login"  , { email: userEmail , password : userPassword},  { withCredentials: true });
            
            if(res.data.user){
                setUser(user);
                return res.data.message;
            }
        }
        catch(error)
        {
         throw error;
        }
    }


    const handleLogout = async () => {
        try {
            const response = await axios.post("https://projectv1-1.onrender.com/user/logout", {}, { withCredentials: true });
            
            if (response.status === 200) {
            // 1. Clear your Global State (Redux, Context, etc.)
            setUser(null); 
            return response;
            }
        } catch (error) {
            console.error("Logout failed", error);
        }
    };
     
    let data = {handleRegister ,handleLogin, handleLogout, user};


      return (
        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
       )



}