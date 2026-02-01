import React from 'react'
import HomePage from './components/HomePage/HomePage'
import NavBar from './components/NavBar/NavBar'
import { Routes , Route} from 'react-router-dom'
import Mentor from './components/Mentors/Mentor'
import SignIn from './components/SIgnIn/SignIn'
import About from './components/About/About'
import Signup from './components/Signup/Signup'
import { AuthProvider } from './components/context/authContext'
import { ToastContainer, toast } from 'react-toastify';
import Loby from './components/videoCall/loby'
const App = () => {
  return (
    <div>
      <AuthProvider>
      <ToastContainer/>
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/mentors' element={<Mentor />} />
        <Route path='/about' element={<About />} />
        <Route path='/signin' element={<SignIn />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/:loby' element={<Loby />} />
      </Routes>
      </AuthProvider>
    </div>
  )
}

export default App