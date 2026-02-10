import React from 'react'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/NavBar/NavBar'
import { Routes, Route } from 'react-router-dom'
import { MentorCard } from './components/Mentors/MentorCard';
import SignIn from './components/SIgnIn/SignIn'
import About from './components/About/About'
import Signup from './components/Signup/Signup'
import { AuthProvider } from './components/context/authContext'
<<<<<<< HEAD
import { ToastContainer, toast } from 'react-toastify';
import Loby from './components/videoCall/loby'
import MyBookings from './components/MyBookings/MyBookings';
=======
import { ToastContainer } from 'react-toastify';
import Loby from './components/videoCall/loby'

>>>>>>> eefa2779cadc30939e256c7ea40fa0be8f01922c
import 'react-toastify/dist/ReactToastify.css';

// Create a Mentors page component
const Mentors = () => {
  const mentorsList = [
    {
      id: 1,
      name: "Advocate Priya Sharma",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400",
      specialization: "Corporate Law",
      experience: 12,
      rating: 4.9,
      bio: "Specialized in corporate compliance, mergers & acquisitions, and business contracts.",
      sessions: 450,
      students: 280,
      responseTime: "< 2hrs",
      chatPrice: 1500,
      videoPrice: 3500,
      verified: true,
    },
    {
      id: 2,
      name: "Advocate Rajesh Kumar",
      image: "https://images.unsplash.com/photo-1556157382-97eda2f9e2bf?w=400",
      specialization: "Criminal Law",
      experience: 15,
      rating: 4.8,
      bio: "Expert in criminal defense, civil litigation, and consumer rights.",
      sessions: 620,
      students: 410,
      responseTime: "< 1hr",
      chatPrice: 1800,
      videoPrice: 4000,
      verified: true,
    },
    {
      id: 3,
      name: "Advocate Meera Desai",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400",
      specialization: "Family Law",
      experience: 10,
      rating: 4.9,
      bio: "Compassionate guidance in family disputes, divorce proceedings, and child custody.",
      sessions: 380,
      students: 220,
      responseTime: "< 3hrs",
      chatPrice: 1200,
      videoPrice: 2800,
      verified: true,
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      <NavBar />
      <div>
        <h1 className="text-6xl font-bold underline p-4 mb-4 text-center bg-linear-to-r from-blue-600 to-[#e7bd3e] bg-clip-text text-transparent">Our Legal Mentors</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {mentorsList.map((mentor) => (
            <MentorCard key={mentor.id} mentor={mentor} />
          ))}
        </div>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <AuthProvider>
<<<<<<< HEAD
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mentors' element={<Mentors />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/:loby' element={<Loby />} />
        <Route path='/myBookings' element={<MyBookings/>}/>
=======
        <ToastContainer />
        <Routes>
          <Route path='/' element={<HomePage />} />
          <Route path='/mentors' element={<Mentors />} />
          <Route path='/about' element={<About />} />
          <Route path='/signin' element={<SignIn />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/loby' element={<Loby />} />
          
>>>>>>> eefa2779cadc30939e256c7ea40fa0be8f01922c
        </Routes>
      </AuthProvider>
    </div>
  )
}

export default App