import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup , login , profile} from "../controllers/user.js";


router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , login);
router.get('/profile' , profile);


export default router