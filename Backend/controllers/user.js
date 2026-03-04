
import User from "../models/user.js";
import { createSecretToken } from "../utils/createToken.js";
import bcrypt from "bcrypt";

export const signup = async (req , res)=>{
   try{
      let {username , email , password} = req.body;
      if(!username || !email || !password){
        return res.status(400).json({ message: "All fields are required" });
      }

      let existingUser = await User.findOne({email});
      
      if(existingUser){
        return res.status(400).json({ message: "user already exist" });
      }
       const hashedPassword = await bcrypt.hash(password , 10);

       const user = new User({
        email : email,
        username : username,
        password : hashedPassword,
       });

       await user.save();

        let token = createSecretToken(user._id);
        console.log(user);
        res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
        });
        res.status(201).json({ message: "User signed in successfully", success: true, user });

        }
    catch(error){
        console.log(error);
        res.status(500).json({ message: "Server error", error });
    }


}

export const login = async (req , res)=>{

    try{

        const {email , password} = req.body;
        if(!email || !password){
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({email});

        if(!user){
            return res.status(404).json({msg: "User not found"});
        }
        const isPasswordCorrect = await bcrypt.compare(password , user.password);


        let token = createSecretToken(user._id);

        if(isPasswordCorrect){
            res.cookie("token", token, {
            withCredentials: true,
            httpOnly: false,
           });
           res.status(201).json({ message: "User logged in successfully", success: true, user });
        }else{
            return  res.status(401).json({msg: "Invalid credentials"});
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: "Server error", error });
    }
}


export const checkAuth = ("/checkAuth", (req, res) => {

  console.log("verify req is coming"+ req.cookies);
  if (req.cookies?.token) {
    // optionally verify the token
    return res.json({ authenticated: true });
  }
  res.json({ authenticated: false });
});


export const logout = ("/logout" , (req, res) => {
  res.cookie("token", "", {
    httpOnly: true,
    secure: true, // Use true if using HTTPS
    sameSite: "strict",
    expires: new Date(0), // Sets expiration to 1970 (immediate deletion)
  });

  res.status(200).json({ message: "Logged out successfully" });
});





