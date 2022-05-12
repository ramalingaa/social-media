import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useClickOutside } from '../../../customeHooks/useClickOutside';
import { useAuth } from "../../context/index-context"
import { UserProfile } from "../index-components"


const Navbar = () => {
  const { jwtToken } = useAuth()
  const [profileDisplay, setProfileDisplay] = useState(false)
  const toggleProfileCard = () => {
    setProfileDisplay((prev) => !prev)
  }
  const clickOutside = useClickOutside(setProfileDisplay)
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
      {profileDisplay && <UserProfile setProfileDisplay = {setProfileDisplay} clickOutside = {clickOutside}/>}
      
      </nav>
    </main>
  )
}

export default Navbar