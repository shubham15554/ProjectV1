import React from 'react'
import NavBar from '../NavBar/NavBar'
import { useNavigate } from 'react-router-dom'
import './Mentors.css'

const Mentor = () => {
  const Navigate = useNavigate();
  return (
    <div>
    <NavBar />
    <div className='p-4 bg-black h-[84.5vh] w-screen'>
    <div className="box hover:scale-108 ">
      <img src="https://media.istockphoto.com/id/1341846242/photo/single-young-women-stock-photo.webp?a=1&b=1&s=612x612&w=0&k=20&c=U3rdh-ZpPgcJZ6cP9QUslaro1KGdi0wrLXYKWmubBoU=" alt="" />
      <h1 className='text-xl font-bold'>Ajay Yadav</h1>
      <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Beatae, obcaecati?</p>
      <button className='font-bold text-l px-4 py-2 bg-blue-900 text-white rounded cursor-pointer active:scale-98' onClick={()=>Navigate('/loby')}>Call Now</button>
    </div>
    </div>
    </div>
  )
}

export default Mentor