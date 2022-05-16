import React from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useClickOutside } from '../../../customeHooks/useClickOutside';
import { useSelector, useDispatch } from 'react-redux';
import { postActions } from './../../../redux store/postSlice';

const UserProfile = ({setProfileDisplay}) => {
    const { userProfileData } = useSelector((store) => store.post)
    const dispatch = useDispatch()
    const  navigate  = useNavigate()
    const logoutUser = () => {
        localStorage.removeItem("ONE")
        dispatch(postActions.getJwtToken(""))
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
