import mongoose from "mongoose";
const { Schema } = mongoose;

const sessionSchema = new Schema({   


  plan: { type: String, enum: ["chat", "video"]}, 

  startTime: { type: Date, },        
  endTime: { type: Date },          
  duration: { type: Number, default: 60 },       

  status: { 
    type: String, 
    enum: ["BOOKED", "ONGOING", "COMPLETED", "CANCELLED", "NO_SHOW"], 
    default: "BOOKED" 
  },

  price: { type: Number },          
  message: { type: String },       

  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

export default sessionSchema;