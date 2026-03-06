import { Children } from "react";
import { useState } from "react";
import { createContext } from "react";
import { useContext } from "react";
import { useEffect } from "react";
import axios from "axios";



export const AuthContext = createContext({});


export const AuthProvider = ({children})=>{
            
    let [user , setUser] = useState(null);
    let [loading, setLoading] = useState(true);


    useEffect(() => {
    const checkUserOnRefresh = async () => {
      try {
        // Backend mein ek 'profile' ya 'me' route honi chahiye jo req.cookies check kare
        const res = await axios.get("https://projectv1-1.onrender.com/user/profile", { withCredentials: true });
        if (res.data.user) {
          setUser(res.data.user);
        }
      } catch (err) {
        console.log(err);
        console.log("No active session found" , err);
        setUser(null);
      } finally {
        setLoading(false); // Refresh ka check pura hua, ab loading hatao
      }
    };
    checkUserOnRefresh();
    }, []);

    const handleRegister = async (username , email , password)=>{
        try{ 
            
            let res = await axios.post("https://projectv1-1.onrender.com/user/signup"  , {username , email , password},  { withCredentials: true });
            
            if(res.data.user){
                setUser(res.data.user);
                return res.data.message;
            }
        }
        catch(error)
        {
         throw error;
        }
    }


    const handleLogin = async (userEmail , userPassword , userRole)=>{

        try{ 
            
            let res = await axios.post("https://projectv1-1.onrender.com/user/login"  , { email: userEmail , password : userPassword , role : userRole},  { withCredentials: true });
            if(res.data.user){
                setUser(res.data.user);
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
      
     if (loading) {
      // Jab tak backend check kar raha hai, tab tak ye dikhao
        return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <h2>Loading your profile...</h2> 
        </div>
        );
      }

      return (
        <AuthContext.Provider value={data}>
           {children}
        </AuthContext.Provider>
       )



}