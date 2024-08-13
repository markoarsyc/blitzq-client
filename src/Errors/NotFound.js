import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/NotFound.css"

const NotFound = () => {
  return (
    <div className='not-found-wrapper'>
        <h1>Greška 404: Stranica nije pronađena</h1>
        <p> Povratak na <Link to="/" >početnu stranicu </Link> </p>
    </div>
  )
}

export default NotFound