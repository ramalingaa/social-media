import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/index-context'

const UserProfile = ({setProfileDisplay}) => {
    const { userProfileData, setJwtToken } = useAuth()
    const  navigate  = useNavigate()
    const logoutUser = () => {
        localStorage.removeItem("ONE")
        setJwtToken(() => "")
        setProfileDisplay((prev) => !prev)
        navigate("/login")
        
      }
  return (
    <div className = "profile-card-wrapper">
        <p>Hello <strong>{userProfileData}</strong></p>
        <p >My Habits</p>
        <p>Contact Us</p>
        <button className="btn outlined" onClick = {logoutUser}>Logout</button>
        
    </div>
  )
};

export default UserProfile;
