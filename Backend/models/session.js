import mongoose from "mongoose";

import sessionSchema from "../schema/sessionSchema.js";
const Session = mongoose.model("Session", sessionSchema);


export default Session;