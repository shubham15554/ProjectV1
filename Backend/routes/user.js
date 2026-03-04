import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup , login} from "../controllers/user.js";
import { checkAuth } from "../controllers/user.js";


router.post("/signup" , signup);
router.post("/login" , login);
router.post("/logout" , login);
router.get('/checkAuth' , checkAuth);


export default router