import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {createServer} from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import  cors  from "cors";
import mongoose, { mongo } from "mongoose";
import cookieParser from "cookie-parser"; // 1. Import
import userRouter from "./routes/user.js";

import User from "./models/user.js";
import { createSecretToken } from "./utils/createToken.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


const app = express();
const server = createServer(app);
const io = connectToSocket(server);
app.use(cookieParser()); 
app.use(express.json());
import sessionRouter from "./routes/session.js";
import mentorRouter from "./routes/mentor.js";

app.use(cors({
  origin: ['http://localhost:5174' , 'https://project-v1-338y.vercel.app'], 
  credentials: true               
}));


// import dns from 'dns';
// dns.setServers(["1.1.1.1", "8.8.8.8"]);


app.use("/user" , userRouter);
app.use("/session" , sessionRouter);
app.use("/mentor" , mentorRouter);



const start = async ()=>{

    server.listen(8000 , ()=>{
        console.log("server is listening on port: "+8000)
    });
    let url = 'mongodb+srv://ry957933_db_user:4IZbQnCnH78h830S@lexbridge.ahjrza9.mongodb.net/?appName=lexbridge';
     mongoose.connect(url)
    .then(()=>console.log("database connected"))
    .catch((e)=>console.log("database not connected"));

    
}

start();