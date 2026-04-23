import express from "express";
const router = express.Router();
import User from '../models/user.js'
import { createSecretToken } from "../utils/createToken.js";
import {signup , login} from "../controllers/user.js";
import { protect } from "../middleware/protect.js";
import { booking , manageBookings, myBookings } from "../controllers/session.js";
import { isMentor } from "../middleware/isMentor.js";

router.post('/booking' ,protect, booking);
router.get('/myBookings' , protect, myBookings);
router.get('/manageBookings' , protect , isMentor , manageBookings);

export default router;