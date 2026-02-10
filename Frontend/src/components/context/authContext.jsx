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
     
    let data = {handleRegister ,handleLogin, user};


      return (
        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
       )



}