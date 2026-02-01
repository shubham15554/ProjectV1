import React, { useState } from 'react';
import { MessageSquare, Video, Star, Award, Clock, X, Calendar as CalendarIcon } from 'lucide-react';

// Standalone Avatar Component
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

// Standalone Badge Component
const Badge = ({ children, className = "" }) => (
  <span className={`inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold ${className}`}>
    {children}
  </span>
);

// Standalone Button Component
const Button = ({ children, onClick, type = "button", variant = "default", className = "", ...props }) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md text-sm font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";
  
  const variants = {
    default: "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500",
    outline: "border-2 border-blue-500 bg-transparent text-blue-600 hover:bg-blue-50 focus:ring-blue-500",
    gradient: "bg-blue-600 hover:bg-blue-700 text-white shadow-lg focus:ring-blue-500",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} px-4 py-2 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Standalone Input Component
const Input = ({ label, id, className = "", ...props }) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
    )}
    <input
      id={id}
      className={`flex h-10 w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all ${className}`}
      {...props}
    />
  </div>
);

// Standalone Textarea Component
const Textarea = ({ label, id, className = "", ...props }) => (
  <div className="space-y-2">
    {label && (
      <label htmlFor={id} className="text-sm font-medium text-gray-300">
        {label}
      </label>
    )}
    <textarea
      id={id}
      className={`flex min-h-[80px] w-full rounded-lg border-2 border-gray-700 bg-gray-900 px-3 py-2 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none ${className}`}
      {...props}
    />
  </div>
);

// Standalone Modal Component
const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4 animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-full p-1 text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-400 z-10 transition-all"
        >
          <X className="h-5 w-5" />
        </button>
        
        {children}
      </div>
    </div>
  );
};

// Simple Calendar Component
const SimpleCalendar = ({ selected, onSelect }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const daysInMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth() + 1,
    0
  ).getDate();
  
  const firstDayOfMonth = new Date(
    currentMonth.getFullYear(),
    currentMonth.getMonth(),
    1
  ).getDay();
  
  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];
  
  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="p-2" />);
  }
  
  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const isSelected = selected && 
      date.getDate() === selected.getDate() &&
      date.getMonth() === selected.getMonth() &&
      date.getFullYear() === selected.getFullYear();
    const isPast = date < new Date().setHours(0, 0, 0, 0);
    
    days.push(
      <button
        key={day}
        type="button"
        onClick={() => !isPast && onSelect(date)}
        disabled={isPast}
        className={`p-2 text-sm rounded-lg transition-all ${
          isSelected 
            ? 'bg-blue-600 text-white font-semibold shadow-md' 
            : isPast
            ? 'text-gray-600 cursor-not-allowed'
            : 'hover:bg-gray-800 text-gray-300 hover:text-blue-400'
        }`}
      >
        {day}
      </button>
    );
  }
  
  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };
  
  const prevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };
  
  return (
    <div className="border-2 border-gray-700 rounded-xl p-4 bg-gray-900 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <button type="button" onClick={prevMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-blue-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        <div className="font-semibold text-sm text-white">
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </div>
        <button type="button" onClick={nextMonth} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-blue-400 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-7 gap-1">
        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
          <div key={day} className="p-2 text-center text-xs font-medium text-gray-500">
            {day}
          </div>
        ))}
        {days}
      </div>
    </div>
  );
};

// Booking Modal Component (Embedded)
const BookingModal = ({ isOpen, onClose, mentor, selectedPlan }) => {
  const [date, setDate] = useState(new Date());
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
    timeSlot: '',
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking submitted:', {
      mentor: mentor.name,
      plan: selectedPlan,
      date,
      ...formData,
    });
    alert(`Booking request sent to ${mentor.name}!\nPlan: ${selectedPlan === 'chat' ? 'Chat Session' : 'Video Call'}\nWe'll confirm your session shortly.`);
    onClose();
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const planDetails = {
    chat: {
      icon: MessageSquare,
      title: 'Chat Session',
      price: mentor?.chatPrice,
      description: 'Text-based mentorship session',
      bgColor: 'bg-gray-800',
      borderColor: 'border-blue-600',
      iconBg: 'bg-blue-900/50',
      iconColor: 'text-blue-400',
    },
    video: {
      icon: Video,
      title: 'Video Call',
      price: mentor?.videoPrice,
      description: 'Face-to-face video mentorship',
      bgColor: 'bg-gray-800',
      borderColor: 'border-blue-600',
      iconBg: 'bg-blue-900/50',
      iconColor: 'text-blue-400',
    },
  };

  const currentPlan = planDetails[selectedPlan] || planDetails.chat;
  const PlanIcon = currentPlan.icon;

  const timeSlots = [
    '09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '02:00 PM', '03:00 PM', '04:00 PM', '05:00 PM',
    '06:00 PM', '07:00 PM',
  ];

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="p-6 bg-black">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-2">
            <div className={`p-3 rounded-xl ${currentPlan.iconBg}`}>
              <PlanIcon className={`w-6 h-6 ${currentPlan.iconColor}`} />
            </div>
            <h2 className="text-2xl font-bold text-white">Book {currentPlan.title}</h2>
          </div>
          <p className="text-sm text-gray-400">
            Schedule your session with {mentor?.name} - {mentor?.specialization}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Summary */}
          <div className={`p-5 rounded-xl ${currentPlan.bgColor} border-2 ${currentPlan.borderColor}`}>
            <div className="flex items-center justify-between">
              <div>
                <div className="font-semibold text-white">{currentPlan.title}</div>
                <div className="text-sm text-gray-400">{currentPlan.description}</div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold text-white">₹{currentPlan.price}</div>
                <div className="text-xs text-gray-500">per hour</div>
              </div>
            </div>
          </div>

          {/* Personal Information */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />
              Your Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Full Name *"
                id="name"
                name="name"
                placeholder="Enter your name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              
              <Input
                label="Email *"
                id="email"
                name="email"
                type="email"
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
            </div>

            <Input
              label="Phone Number *"
              id="phone"
              name="phone"
              type="tel"
              placeholder="+91 XXXXX XXXXX"
              value={formData.phone}
              onChange={handleInputChange}
              required
            />
          </div>

          {/* Schedule Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-white flex items-center gap-2">
              <div className="w-1 h-5 bg-blue-600 rounded-full" />
              Select Date & Time
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4" />
                  Choose Date
                </label>
                <SimpleCalendar selected={date} onSelect={setDate} />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Choose Time Slot
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-[280px] overflow-y-auto p-3 border-2 border-gray-700 rounded-xl bg-gray-800">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      className={`p-2.5 text-sm rounded-lg border-2 transition-all duration-200 ${
                        formData.timeSlot === slot
                          ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                          : 'bg-gray-900 hover:bg-gray-800 border-gray-700 hover:border-blue-500 text-gray-300'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Message */}
          <Textarea
            label="Message to Mentor (Optional)"
            id="message"
            name="message"
            placeholder="Tell the mentor what you'd like to discuss..."
            value={formData.message}
            onChange={handleInputChange}
            rows={3}
          />

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              variant="gradient"
              className="flex-1"
            >
              Confirm Booking
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

// Main Mentor Card Component
export const MentorCard = ({ mentor }) => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlanSelect = (plan) => {
    setSelectedPlan(plan);
    setIsModalOpen(true);
  };

  return (
    <>
      <div 
        className="group relative w-full max-w-sm overflow-hidden rounded-3xl bg-gray-900 border-2 border-gray-800 shadow-xl hover:shadow-xl transition-all duration-500 hover:scale-[1.02]"
      >
        {/* Card Content */}
        <div className="relative p-6 bg-[#131313]">
          {/* Header Section */}
          <div className="flex items-start gap-4 mb-6">
            {/* Avatar with gradient border */}
            <div className="relative">
              <Avatar 
                src={mentor.image} 
                alt={mentor.name}
                fallback={mentor.name.split(' ').map(n => n[0]).join('')}
                className="relative h-20 w-20 border-4 border-gray-800 shadow-lg ring-2 ring-gray-700 group-hover:ring-blue-600 transition-all duration-300"
              />
              {mentor.verified && (
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-1.5 shadow-md border-2 border-gray-900">
                  <Award className="w-4 h-4 text-white" />
                </div>
              )}
            </div>

            {/* Mentor Info */}
            <div className="flex-1 min-w-0">
              <h3 className="text-xl font-bold text-white mb-1 truncate group-hover:text-blue-800 transition-colors duration-300">
                {mentor.name}
              </h3>
              <Badge className="mb-2 bg-blue-600 text-white border-0 shadow-md">
                {mentor.specialization}
              </Badge>
              <div className="flex items-center gap-3 text-sm text-gray-400">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="font-semibold text-white">{mentor.rating}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4 text-blue-400" />
                  <span>{mentor.experience}+ years</span>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <p className="text-sm text-gray-400 mb-6 line-clamp-2 leading-relaxed">
            {mentor.bio}
          </p>

          {/* Stats/Achievements */}
          <div className="flex items-center justify-between mb-6 pb-6 border-b-2 border-gray-800">
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mentor.sessions}</div>
              <div className="text-xs text-gray-500 font-medium">Sessions</div>
            </div>
            <div className="w-px h-12 bg-gray-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mentor.students}</div>
              <div className="text-xs text-gray-500 font-medium">Students</div>
            </div>
            <div className="w-px h-12 bg-gray-800" />
            <div className="text-center">
              <div className="text-2xl font-bold text-white">{mentor.responseTime}</div>
              <div className="text-xs text-gray-500 font-medium">Response</div>
            </div>
          </div>

          {/* Plan Selection */}
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-gray-300 mb-3">Select Your Plan</h4>
            
            {/* Chat Plan */}
            <button
              onClick={() => handlePlanSelect('chat')}
              className="w-full group/plan flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 bg-[#000000] hover:bg-gray-750  transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#000000] shadow-sm group-hover/plan:shadow-md border-2 border-gray-700 group-hover/plan:border-blue-500 transition-all duration-300">
                  <MessageSquare className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Chat Session</div>
                  <div className="text-xs text-gray-400">Text-based mentorship</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  ₹{mentor.chatPrice}
                </div>
                <div className="text-xs text-gray-500">per hour</div>
              </div>
            </button>

            {/* Video Call Plan */}
            <button
              onClick={() => handlePlanSelect('video')}
              className="w-full group/plan flex items-center justify-between p-4 rounded-xl border-2 border-gray-800 bg-[#000000] hover:bg-gray-750 transition-all duration-300 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-black shadow-sm group-hover/plan:shadow-md border-2 border-gray-700 group-hover/plan:border-blue-500 transition-all duration-300">
                  <Video className="w-5 h-5 text-blue-400" />
                </div>
                <div className="text-left">
                  <div className="font-semibold text-white">Video Call</div>
                  <div className="text-xs text-gray-400">Face-to-face mentorship</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-lg font-bold text-white">
                  ₹{mentor.videoPrice}
                </div>
                <div className="text-xs text-gray-500">per hour</div>
              </div>
            </button>
          </div>
        </div>

      </div>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        mentor={mentor}
        selectedPlan={selectedPlan}
      />
    </>
  );
};

export default MentorCard;