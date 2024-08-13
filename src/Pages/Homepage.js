import React from 'react'
import Navbar from '../Navbar'
import { useNavigate } from 'react-router-dom'
import "../Styles/Homepage.css"


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className='homepage-main-wrapper'>
      <Navbar username="Korisnicko ime" route="/profile" />
      <button onClick={()=>{
        navigate("/waiting");
      }}>IGRAJ</button>
    </div>
  )
}

export default Homepage