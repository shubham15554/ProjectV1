import React, { useState, useContext } from 'react';
import { MessageSquare, Video, Star, Award, Clock, X, Calendar as CalendarIcon } from 'lucide-react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../context/authContext';

// --- Standalone UI Components (No styling changes) ---

const Avatar = ({ src, alt, fallback, className = "" }) => (
  <div className={`relative flex shrink-0 overflow-hidden rounded-full ${className}`}>
    {src ? (
      <img src={src} alt={alt} className="aspect-square h-full w-full object-cover" />
    ) : (
      <div className="flex h-full w-full items-center justify-center rounded-full bg-blue-600 text-white text-xl font-semibold">
        {fallback}
      </div>
    )}
  </div>
);

const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

const Button = ({ children, onClick, type = "button", variant = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    gradient: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:ring-blue-500",
  };
  return (
    <button type={type} onClick={onClick} className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className}`} {...props}>
      {children}
    </button>
  );
};

const Input = ({ label, id, className = "", ...props }) => (
  <div className="space-y-2">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>}
    <input id={id} className={`flex h-10 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all ${className}`} {...props} />
  </div>
);

const Textarea = ({ label, id, className = "", ...props }) => (
  <div className="space-y-2">
    {label && <label htmlFor={id} className="text-sm font-medium text-gray-300">{label}</label>}
    <textarea id={id} className={`flex min-h-[80px] w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none ${className}`} {...props} />
  </div>
);

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-in fade-in zoom-in duration-200">
        <button onClick={onClose} className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-white hover:bg-gray-800 z-10">
          <X className="h-5 w-5" />
        </button>
        {children}
      </div>
    </div>
  );
};

const SimpleCalendar = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const daysInMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0).getDate();
  const firstDayOfMonth = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1).getDay();
  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) days.push(<div key={`empty-${i}`} className="p-2" />);
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected = selected && date.toDateString() === selected.toDateString();
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    days.push(
      <button key={day} type="button" onClick={() => !isPast && onSelect(date)} disabled={isPast}
        className={`p-2 text-sm rounded-lg transition-all ${isSelected ? 'bg-blue-600 text-white font-semibold' : isPast ? 'text-gray-600' : 'hover:bg-gray-800 text-gray-300'}`}>
        {day}
      </button>
    );
  }
  return (
    <div className="border-2 border-gray-700 rounded-xl p-4 bg-gray-900">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() - 1)))}><X className="w-5 h-5 rotate-90"/></button>
        <div className="font-semibold text-white">{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</div>
        <button type="button" onClick={() => setCurrentMonth(new Date(currentMonth.setMonth(currentMonth.getMonth() + 1)))}><X className="w-5 h-5 -rotate-90"/></button>
      </div>
      <div className="grid grid-cols-7 gap-1 text-center">{['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => <div key={d} className="text-xs text-gray-500">{d}</div>)}{days}</div>
    </div>
  );
};

// --- Updated Booking Modal Component ---

const BookingModal = ({ isOpen, onClose, mentor, selectedPlan }) => {
  const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeSlot: '',
  });

  const timeSlots = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // VALIDATION: Ensure a time slot is selected
    if (!formData.timeSlot) {
      toast.error("Please select a time slot", { theme: "dark" });
      return;
    }

    // Prepare data exactly how the MyBookings page needs it
    const submissionData = {
      ...formData,
      date: selectedDate.toLocaleDateString("en-CA"), // YYYY-MM-DD format
      mentorName: mentor?.name,
      planType: selectedPlan,
      userId: user?._id
    };

    try {
      let res = await axios.post('http://localhost:8000/session/booking', submissionData);
      toast.success(res.data.message || "Booking Confirmed!", { theme: "dark" });
      onClose();
    } catch (err) {
      toast.error("Booking failed. Please try again.", { theme: "dark" });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const planDetails = {
    chat: { icon: MessageSquare, title: 'Chat Session', price: mentor?.chatPrice, description: 'Text-based mentorship session' },
    video: { icon: Video, title: 'Video Call', price: mentor?.videoPrice, description: 'Face-to-face video mentorship' },
  };

  const currentPlan = planDetails[selectedPlan] || planDetails.chat;
  const PlanIcon = currentPlan.icon;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-black">
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-3 rounded-xl bg-blue-900/50">
              <PlanIcon className="w-6 h-6 text-blue-400" />
            </div>
            <h2 className="text-2xl font-bold text-white">Book {currentPlan.title}</h2>
          </div>
          <p className="text-sm text-gray-400">Schedule with {mentor?.name}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="p-5 rounded-xl bg-gray-800 border-2 border-blue-600 flex justify-between items-center">
            <div>
              <div className="font-semibold text-white">{currentPlan.title}</div>
              <div className="text-sm text-gray-400">{currentPlan.description}</div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-white">₹{currentPlan.price}</div>
              <div className="text-xs text-gray-500">per hour</div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input label="Full Name *" name="name" value={formData.name} onChange={handleInputChange} required />
            <Input label="Email *" name="email" type="email" value={formData.email} onChange={handleInputChange} required />
          </div>
          <Input label="Phone Number *" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><CalendarIcon className="w-4 h-4" /> Choose Date</label>
              <SimpleCalendar selected={selectedDate} onSelect={setSelectedDate} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300 flex items-center gap-2"><Clock className="w-4 h-4" /> Choose Time Slot</label>
              <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto p-3 border-2 border-gray-700 rounded-xl bg-gray-800">
                {timeSlots.map((slot) => (
                  <button key={slot} type="button" onClick={() => setFormData({ ...formData, timeSlot: slot })}
                    className={`p-2.5 text-sm rounded-lg border-2 transition-all ${formData.timeSlot === slot ? 'bg-blue-600 text-white border-blue-500' : 'bg-gray-900 border-gray-700 text-gray-300'}`}>
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <Textarea label="Message (Optional)" name="message" value={formData.message} onChange={handleInputChange} />

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button type="submit" variant="gradient" className="flex-1">Confirm Booking</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// --- Main Mentor Card Component ---

export const MentorCard = ({ mentor }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="group relative w-full max-w-sm overflow-hidden rounded-3xl bg-gray-900 border-2 border-gray-800 shadow-xl transition-all duration-500 hover:scale-[1.02]">
        <div className="relative p-6 bg-[#131313]">
          <div className="flex items-start gap-4 mb-6">
            <Avatar src={mentor.image} alt={mentor.name} fallback={mentor.name.split(' ').map(n => n[0]).join('')} className="h-20 w-20 border-4 border-gray-800" />
            <div className="flex-1">
              <h3 className="text-xl font-bold text-white truncate">{mentor.name}</h3>
              <Badge className="mb-2 bg-blue-600 text-white border-0">{mentor.specialization}</Badge>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1"><Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />{mentor.rating}</div>
                <div className="flex items-center gap-1"><Clock className="w-4 h-4 text-blue-400" />{mentor.experience}+ yrs</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-800 text-center">
            <div><div className="text-2xl font-bold text-white">{mentor.sessions}</div><div className="text-xs text-gray-500">Sessions</div></div>
            <div className="w-px h-12 bg-gray-800" />
            <div><div className="text-2xl font-bold text-white">{mentor.students}</div><div className="text-xs text-gray-500">Students</div></div>
            <div className="w-px h-12 bg-gray-800" />
            <div><div className="text-2xl font-bold text-white">{mentor.responseTime}</div><div className="text-xs text-gray-500">Response</div></div>
          </div>

          <div className="space-y-3">
            <button onClick={() => handlePlanSelect('chat')} className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 bg-black hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3"><MessageSquare className="text-blue-400" /> <div className="text-left text-white font-semibold">Chat Session</div></div>
              <div className="text-white font-bold">₹{mentor.chatPrice}</div>
            </button>
            <button onClick={() => handlePlanSelect('video')} className="w-full flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 bg-black hover:border-blue-500 transition-all">
              <div className="flex items-center gap-3"><Video className="text-blue-400" /> <div className="text-left text-white font-semibold">Video Call</div></div>
              <div className="text-white font-bold">₹{mentor.videoPrice}</div>
            </button>
          </div>
        </div>
      </div>

      <BookingModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} mentor={mentor} selectedPlan={selectedPlan} />
    </>
  );
};

export default MentorCard;