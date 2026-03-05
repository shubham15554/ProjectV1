
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
            httpOnly: true,         // Security ke liye best (JS access nahi kar payega)
            secure: true,           // Render (HTTPS) ke liye mandatory hai
            sameSite: "none",       // Localhost aur Render ke beech communication ke liye must hai
            maxAge: 24 * 60 * 60 * 1000, // 1 din ki expiry (Iske bina refresh par gayab hogi)
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

        if(isPasswordCorrect) {
            res.cookie("token", token, {
                httpOnly: true,         // Security ke liye best (JS access nahi kar payega)
                secure: true,           // Render (HTTPS) ke liye mandatory hai
                sameSite: "none",       // Localhost aur Render ke beech communication ke liye must hai
                maxAge: 24 * 60 * 60 * 1000, // 1 din ki expiry (Iske bina refresh par gayab hogi)
            });

            res.status(201).json({ 
                message: "User logged in successfully", 
                success: true, 
                user 
            });
        }
        else{
            return  res.status(401).json({msg: "Invalid credentials"});
        }

    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: "Server error", error });
    }
}


export const profile = ("/profile" , async (req, res) => {
   try {
        const token = req.cookies.token; // Cookie se token liya
        if (!token) return res.status(401).json({ message: "No token" });

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        const user = await User.findById(decoded.id).select("-password");
        
        if (!user) return res.status(404).json({ message: "User not found" });
        
        res.status(200).json({ user });
    } catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
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





