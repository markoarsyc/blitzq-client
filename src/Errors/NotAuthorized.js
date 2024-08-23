import React from 'react'
import { Link } from 'react-router-dom'
import "../Styles/ErrorPage.css"

const NotAuthorized = () => {
  return (
    <div className='error-page-wrapper'>
        <h1>Greška 401: Neautorizovan pristup</h1>
        <p> Povratak na <Link to="/" >početnu stranicu </Link> </p>
    </div>
  )
}

export default NotAuthorized