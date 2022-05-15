import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserProfile } from "../index-components"
import { useSelector } from "react-redux"

const Navbar = () => {
  const { jwtToken } = useSelector((store) => store.post)
  const [profileDisplay, setProfileDisplay] = useState(false)
  const toggleProfileCard = () => {
    setProfileDisplay((prev) => !prev)
  }
  return (
    <main className = "navbar-main-wrapper">
      <nav className="navbar">
      <Link to = "/" className="navbar-logo">
          <h2>One Mile</h2>
      </Link>
      {jwtToken && 
      <div className = "page-links">
        <i className="far fa-user nav-icon" onClick = {toggleProfileCard}></i>
      </div>
      }
      
      {profileDisplay && 
        <UserProfile setProfileDisplay = {setProfileDisplay}/>
    
       }
       
      
      </nav>
    </main>
  )
}

export default Navbar