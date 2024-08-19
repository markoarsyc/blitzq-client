import React from 'react'
import Navbar from '../Navbar'
import { useNavigate,Link } from 'react-router-dom'
import "../Styles/Homepage.css"


const Homepage = () => {
  const navigate = useNavigate();

  return (
    <div className='homepage-main-wrapper'>
      <Navbar route="/profile" />
      <button onClick={()=>{
        navigate("/waiting");
      }}>IGRAJ</button>
      <p className='category'>Pomozi nam da poboljšamo igru i <Link to="/category">predloži novu kategoriju</Link></p>
    </div>
  )
}

export default Homepage