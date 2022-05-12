import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useClickOutside } from '../../../customeHooks/useClickOutside';
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
    let clickOutside = useClickOutside(setProfileDisplay)
  return (
    <div className = "profile-card-wrapper" ref = {clickOutside}>
        <p>Hello <strong>{userProfileData.firstName}</strong></p>
        <Link to = "/myprofile">My Profile</Link>
        <button className="btn outlined" onClick = {logoutUser}>Logout</button>
    </div>
  )
};

export default UserProfile;
