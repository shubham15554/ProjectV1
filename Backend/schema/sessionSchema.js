import mongoose from "mongoose";
import { Schema } from "mongoose";


const sessionSchema = new mongoose.Schema({
  // The user who is booking (from AuthContext)
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    
  },
  // The name of the mentor being booked
  mentorName: {
    type: String,
    required: true
  },
  mentorId : {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  // Plan details (chat vs video)
  planType: {
    type: String,
    enum: ['chat', 'video'],
    required: true
  },
  // Personal info from the form
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  message: {
    type: String
  },
  // Date and Time (Matches the 'en-CA' and 'timeSlot' strings)
  date: {
    type: String, // Stored as "YYYY-MM-DD"
    required: true
  },
  timeSlot: {
    type: String, // Stored as "10:00 AM"
    required: true
  },
  // Meeting link for the "Join Now" button (can be updated by mentor later)
  meetingLink: {
    type: String,
    default: "https://meet.google.com" 
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'completed', 'cancelled'],
    default: 'confirmed'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default sessionSchema;
