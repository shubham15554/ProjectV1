import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Clock, Calendar, Video, AlertCircle } from "lucide-react";
import NavBar from '../NavBar/NavBar'
import { AuthContext } from "../context/authContext";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [now, setNow] = useState(new Date());
  let {user } = useContext(AuthContext)
  // 1. Update current time every minute to refresh "Join" button status
  useEffect(() => {
    console.log(user);
    const timer = setInterval(() => setNow(new Date()), 60000);
    return () => clearInterval(timer);
    
  }, []);

  // 2. Fetch data from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("https://projectv1-1.onrender.com/session/myBookings",{
      withCredentials: true
    });
      console.log("bookings ...........");
      console.log(res);
      setBookings(res.data.myBookings || []);
    } catch (e) {
      console.error("Fetch error:", e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  /**
   * 3. Helper to turn "2026-02-10" and "10:00 AM" into a real JS Date object
   * This handles the 12-hour AM/PM format sent by your BookingModal.
   */
  const parseDateTime = (dateStr, timeStr) => {
    if (!dateStr || !timeStr) return null;
    try {
      const [time, modifier] = timeStr.split(" ");
      let [hours, minutes] = time.split(":");
      
      let h = parseInt(hours, 10);
      if (modifier === "PM" && h < 12) h += 12;
      if (modifier === "AM" && h === 12) h = 0;

      const dateObj = new Date(dateStr); // Parses "YYYY-MM-DD"
      dateObj.setHours(h, parseInt(minutes, 10), 0);
      return dateObj;
    } catch (e) {
      return null;
    }
  };

  /**
   * 4. Check if the meeting is joinable (5 mins before start until 60 mins after)
   */
  const isJoinable = (dateStr, timeStr) => {
    const start = parseDateTime(dateStr, timeStr);
    if (!start) return false;

    const bufferStart = new Date(start.getTime() - 5 * 60000); 
    const end = new Date(start.getTime() + 60 * 60000); 
    
    return now >= bufferStart && now <= end;
    return true;
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="">
    <NavBar/>
    <div className="max-w-4xl mx-auto p-6 space-y-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold text-white">My Bookings</h2>
        <span className="text-sm text-gray-500 bg-gray-900 px-3 py-1 rounded-full border border-gray-800">
          Local Time: {now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
      
      {bookings.length === 0 ? (
        <div className="bg-gray-900/50 border-2 border-dashed border-gray-800 rounded-3xl p-12 text-center">
          <AlertCircle className="w-12 h-12 text-gray-600 mx-auto mb-4" />
          <p className="text-gray-400 text-lg">You have no scheduled sessions yet.</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {bookings.map((b) => {
            const joinActive = isJoinable(b.date, b.timeSlot);
            
            return (
              <div 
                key={b._id} 
                className={`bg-gray-900 border transition-all duration-300 rounded-2xl p-5 flex flex-col md:flex-row items-center justify-between gap-4 ${
                  joinActive ? 'border-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.1)]' : 'border-gray-800'
                }`}
              >
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-bold text-xl">
                      {b.name || "Guest"}'s Session
                    </h3>
                    {joinActive && (
                       <span className="flex h-2 w-2 rounded-full bg-green-500 animate-pulse"></span>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap gap-5">
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Calendar className="w-4 h-4 text-blue-500" />
                      {/* Displays date string as "Feb 10, 2026" */}
                      <span className="font-medium">
                        {b.date ? new Date(b.date).toLocaleDateString(undefined, { dateStyle: 'medium' }) : "N/A"}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-2 text-gray-400 text-sm">
                      <Clock className="w-4 h-4 text-blue-500" />
                      <span className="font-medium text-gray-200">{b.timeSlot || "Time not set"}</span>
                    </div>
                  </div>
                  
                  {b.message && (
                    <p className="mt-3 text-sm text-gray-500 line-clamp-1 italic">
                      " {b.message} "
                    </p>
                  )}
                </div>

                <div className="flex items-center w-full md:w-auto">
                  {joinActive ? (
                    <button 
                      onClick={() => Navigate(b.meetingLink)}
                      className="w-full md:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 transition-transform active:scale-95"
                    >
                      <Video className="w-5 h-5" />
                      Join Now
                    </button>
                  ) : (
                    <button 
                      disabled 
                      className="w-full md:w-auto bg-gray-800 text-gray-500 px-8 py-3 rounded-xl font-bold cursor-not-allowed border border-gray-700 flex items-center justify-center gap-2"
                    >
                      Upcoming
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
    </div>
  );
};

export default MyBookings;