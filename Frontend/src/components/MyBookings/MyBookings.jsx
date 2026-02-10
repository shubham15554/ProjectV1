import React, { useEffect, useState } from "react";
import axios from "axios";
import { Clock } from "lucide-react";

const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch bookings from backend
  const fetchBookings = async () => {
    try {
      const res = await axios.get("http://localhost:8000/session/userBookings", {
        withCredentials: true, // if using cookies for auth
      });
      setBookings(res.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Optional: auto-refresh every minute to update join button
    const interval = setInterval(fetchBookings, 60000);
    return () => clearInterval(interval);
  }, []);

  // Determine if user can join the session
  const isJoinable = (startTime, duration = 60) => {
    const now = new Date();
    const start = new Date(startTime);
    const joinWindowStart = new Date(start.getTime() - 5 * 60000); // 5 mins early
    const joinWindowEnd = new Date(start.getTime() + duration * 60000); // duration in mins
    return now >= joinWindowStart && now <= joinWindowEnd;
  };

  if (loading) return <p className="text-white">Loading your bookings...</p>;

  if (!bookings.length)
    return <p className="text-gray-400">You have no bookings yet.</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-4">
      {bookings.map((b) => (
        <div
          key={b._id}
          className="flex flex-col md:flex-row items-center justify-between p-4 border-2 border-gray-700 rounded-xl bg-gray-900 transition-all"
        >
          <div className="flex-1">
            <h3 className="text-white font-semibold text-lg">
              {b.mentor?.name || "Mentor Name"}
            </h3>
            <p className="text-gray-400 text-sm flex items-center gap-2">
              <Clock className="w-4 h-4" />
              {new Date(b.startTime).toLocaleString()} - {b.plan.toUpperCase()}
            </p>
            <p className="text-gray-400 text-sm">Time Slot: {b.timeSlot}</p>
          </div>

          <button
            disabled={!isJoinable(b.startTime)}
            className={`mt-4 md:mt-0 px-5 py-2 rounded-lg font-semibold transition-all ${
              isJoinable(b.startTime)
                ? "bg-blue-600 text-white hover:bg-blue-700"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
            }`}
          >
            Join
          </button>
        </div>
      ))}
    </div>
  );
};

export default MyBookings;
