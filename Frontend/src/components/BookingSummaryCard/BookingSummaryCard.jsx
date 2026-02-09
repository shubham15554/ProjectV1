import React from 'react';
import { MessageSquare, Video, Calendar, Clock, User, Mail, CheckCircle2 } from 'lucide-react';

const DetailRow = ({ icon: Icon, label, value }) => (
  <div className="flex items-center gap-3 py-3 border-b border-gray-800 last:border-0">
    <div className="p-2 rounded-lg bg-gray-900 border border-gray-800">
      <Icon className="w-4 h-4 text-blue-400" />
    </div>
    <div>
      <p className="text-[10px] uppercase tracking-wider text-gray-500 font-bold">{label}</p>
      <p className="text-sm text-white font-medium">{value}</p>
    </div>
  </div>
);

const BookingSummaryCard = ({ bookingData }) => {
  const data = bookingData || {
    mentorName: "Allen John",
    specialization: "Legal Consultant",
    planType: "video",
    price: "1200",
    date: "February 15, 2026",
    timeSlot: "10:00 AM",
    userName: "Sir, Your Name",
    userEmail: "client@lexbridge.com",
    status: "Confirmed"
  };

  const isVideo = data.planType === 'video';

  return (
    <div className="w-full max-w-sm overflow-hidden rounded-3xl bg-[#0F0F0F] border-2 border-gray-800 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="bg-blue-600/10 px-6 py-4 flex items-center justify-between border-b border-blue-900/30">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-blue-500" />
          <span className="text-blue-500 font-bold text-sm tracking-wide uppercase">Booking {data.status}</span>
        </div>
        <div className="text-xs text-gray-400 font-mono">ID: #LB-{Math.floor(Math.random() * 9000 + 1000)}</div>
      </div>

      <div className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="h-12 w-12 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-lg shadow-blue-900/20">
            {data.mentorName[0]}
          </div>
          <div>
            <h3 className="text-lg font-bold text-white leading-tight">{data.mentorName}</h3>
            <p className="text-xs text-gray-500">{data.specialization}</p>
          </div>
        </div>

        <div className={`mb-6 p-4 rounded-2xl border-2 ${isVideo ? 'border-blue-600 bg-blue-600/5' : 'border-purple-600 bg-purple-600/5'}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {isVideo ? <Video className="text-blue-400" /> : <MessageSquare className="text-purple-400" />}
              <div>
                <p className="text-white font-bold">{isVideo ? 'Video Call' : 'Chat Session'}</p>
                <p className="text-[10px] text-gray-400 tracking-tight">Scheduled for 60 minutes</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-xl font-black text-white">₹{data.price}</p>
              <p className="text-[10px] text-gray-500 uppercase font-bold text-center">Paid</p>
            </div>
          </div>
        </div>

        <div className="space-y-1">
          <h4 className="text-[11px] font-black text-gray-600 uppercase mb-2 tracking-[0.2em]">Session Schedule</h4>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow icon={Calendar} label="Date" value={data.date} />
            <DetailRow icon={Clock} label="Time Slot" value={data.timeSlot} />
          </div>

          <h4 className="text-[11px] font-black text-gray-600 uppercase mt-4 mb-2 tracking-[0.2em]">Your Details</h4>
          <div className="grid grid-cols-1 gap-1">
            <DetailRow icon={User} label="Booked By" value={data.userName} />
            <DetailRow icon={Mail} label="Email Address" value={data.userEmail} />
          </div>
        </div>

        <button 
          className="w-full mt-8 py-4 bg-gray-900 border-2 border-gray-800 hover:border-blue-600 rounded-2xl text-white text-sm font-bold transition-all active:scale-95 group"
          onClick={() => window.print()}
        >
          Download Invoice 
          <span className="ml-2 group-hover:translate-y-1 inline-block transition-transform">↓</span>
        </button>
      </div>
    </div>
  );
};

export default BookingSummaryCard;