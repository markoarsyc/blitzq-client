import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/ErrorPage.css"

const NotFound = () => {
  return (
    <div className='error-page-wrapper'>
        <h1>Greška 404: Stranica nije pronađena</h1>
        <p> Povratak na <Link to="/" >početnu stranicu </Link> </p>
    </div>
  )
}

export default NotFound