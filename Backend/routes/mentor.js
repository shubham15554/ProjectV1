import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import { isMentor } from "../middleware/isMentor.js";
import {allMentors} from "../controllers/mentor.js";
router.get("/allMentors" , allMentors);

export default router;