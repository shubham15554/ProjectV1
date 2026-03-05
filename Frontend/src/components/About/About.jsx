import React from 'react'
import NavBar from '../NavBar/NavBar'
import Card from '../../assets/Cards/Card'

const About = () => {

const mentorshipFeatures = [
  {
    image: "/img1.png",
    title: "Strategic Mentorship",
    description:
      "From everyday target setting to understanding concepts, do everything strategically."
  },
  {
    image: "/img2.png",
    title: "Personal Curriculum",
    description:
      "Get a customized curriculum according to your  preparation needs."
  },
  {
    image: "/img3.png",
    title: "1-1 Sessions",
    description:
      "One-on-one interaction with NLU mentors with 2+ years of experience."
  },
  {
    image: "/img4.png",
    title: "Subject1 Doubt Solving",
    description:
      "Get solutions to your Subject1 doubts with your personal mentor."
  },
  {
    image: "/img1.png",
    title: "Subject2 Doubt Solving",
    description:
      "Your personal mentor will help you with solutions to your Subject1 doubts."
  },
  {
    image: "/img2.png",
    title: "Subject3 Doubt Solving",
    description:
      "Find solutions to your Subject3 doubts with your personal mentor."
  }
];


  return (
    <div className='bg-black'>
      <NavBar />
      <div className='overflow-hidden'>
        <div className='text-center mt-5'>
          <h1 className='text-white text-5xl font-normal capitalize'>What <span className='text-blue-900 underline'>You will get</span> in <span className='text-[#dbaa2f]'>Lexbridge</span> Mentorship</h1>
        </div>
        <div className='flex gap-4 flex-wrap items-center justify-center overflow-hidden p-4 '>
           {mentorshipFeatures.map((elem)=>{
            return <Card elem= {elem} />
           })}
        </div>
       
      </div>
    </div>
  )
}

export default About