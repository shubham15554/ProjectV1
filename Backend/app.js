import dotenv from "dotenv";
dotenv.config();
import express from "express";
import {createServer} from "node:http";
import { connectToSocket } from "./controllers/socketManager.js";
import  cors  from "cors";
import mongoose, { mongo } from "mongoose";
import userRouter from "./routes/user.js"
const app = express();
const server = createServer(app);
const io = connectToSocket(server);
import sessionRouter from "./routes/session.js";
app.use(express.json());
import dns from 'dns';
import User from "./models/user.js";
import User from "./models/user.js";
dns.setServers(["1.1.1.1", "8.8.8.8"]);
app.use(cors({
  origin: "http://localhost:5174", // <-- exact frontend URL
  credentials: true               // <-- allow cookies
}));



app.use("/user" , userRouter);
app.use("/session" , sessionRouter);





const start = async () => {
  try {
    let url = 'mongodb+srv://ry957933_db_user:4IZbQnCnH78h830S@lexbridge.ahjrza9.mongodb.net/?appName=lexbridge';
    // let url2 = 'mongodb+srv://ry957933_db_user:LicU3ZHMU1UuUByN@cluster0.mcyxplm.mongodb.net/?appName=Cluster0'
    await mongoose.connect(url);
    console.log("Database connected");

    server.listen(8000, () => {
      console.log("Server is listening on port 8000");
    });
  } catch (e) {
    console.error("Database not connected:", e);
    process.exit(1); // Stop server if DB fails
  }
};

start();