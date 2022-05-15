import React, { useState, useEffect}from 'react'
import {Outlet, NavLink } from "react-router-dom"
import { UpdateProfileImage, UpdateBgImage, UpdateBio, UpdatePortFolio } from "../index-components"
import { useSelector } from 'react-redux'

const ProfileCarHor = () => {
    const { postsData, userProfileData } = useSelector((store) => store.post)

    const [userPosts, setUserPosts] = useState(0)
    const [updatePhoto, setUpdatePhoto] = useState(false)
    const [updateBgPhoto, setUpdateBgPhoto] = useState(false)
    const [updateBio, setUpdateBio] = useState(false)
    const [updatePortfolio, setUpdatePortfolio] = useState(false)
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        setUserPosts(() => filteredUserData.length)

    },[postsData])
  return (
    <div >
        <div className = "user-profile-cardH user-name-hor user-name-ver">
            <div>
                <img src = {userProfileData.bgImage} alt = "profile badge" className = "res-img"/>
                <button onClick = {() => setUpdateBgPhoto(() => true)} className="update-bg-btn" title = "Update Background Image"><i className="fa-solid fa-pen"></i></button>
                    { updateBgPhoto && 
                    <div className = "edit-from-wrapper">
                        <UpdateBgImage setUpdateBgPhoto = {setUpdateBgPhoto}/>
                    </div>}
            </div>
            <div className = "avatar-bg-wrapper">
                <img src = {userProfileData.badge} alt = "profile badge" className = "avatar lg profile-image-bg" />
                <button onClick = {() => setUpdatePhoto(() => true)} className="update-profile-btn" title = "Update Profile Image"><i className="fa-solid fa-pen"></i></button>
                { updatePhoto && 
                <div className = "edit-from-wrapper">
                    <UpdateProfileImage setUpdatePhoto = {setUpdatePhoto}/>
                </div>}
                <div className = "profile-user-details">
                    <p className = "username text-medium" to = "/myprofile">{userProfileData.firstName + " " + userProfileData.lastName}</p>
                    <div className = "postbtn-label-wrapper">
                        <p>Bio: {userProfileData.bio}</p>
                        <button onClick = {() => setUpdateBio(() => true)} className="update-profile-btn" title = "Update Bio"><i className="fa-solid fa-pen"></i></button>
                        { updateBio && 
                        <div className = "edit-from-wrapper">
                            <UpdateBio setUpdateBio = {setUpdateBio}/>
                        </div>}
                    </div>
                    <div className = "postbtn-label-wrapper">
                        <a href = {userProfileData.portFolioUrl} target="_blank" rel = "noopener noreferrer">Portfolio link: <span className = "portfolio-link">{userProfileData.portFolioUrl}</span></a>
                        <button onClick = {() => setUpdatePortfolio(() => true)} className="update-profile-btn" title = "Update Portfolio"><i className="fa-solid fa-pen"></i></button>
                        { updatePortfolio && 
                        <div className = "edit-from-wrapper">
                            <UpdatePortFolio setUpdatePortfolio = {setUpdatePortfolio}/>
                        </div>}
                    </div>
                    <div className = "user-name-hor follow-section">
                        <div className = "user-name-hor post-count">
                            <p className = "profile-count">{userPosts}</p>
                            <p>Posts</p>
                        </div>
                        <div className = "user-name-hor post-count">
                            <p className = "profile-count">{userProfileData.followers.length}</p>
                            <p>{userProfileData.followers.length === 1 ? "Follower" : "Followers"}</p>
                        </div>
                        <div className = "user-name-hor post-count">
                            <p className = "profile-count">{userProfileData.following.length}</p>
                            <p>Following</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div className = "user-profile-cardH user-name-hor user-tab-wrapper">
            <NavLink to = "/myprofile/posts" className ={({isActive}) => isActive ?  "activeLink": ""}>Posts</NavLink>
            <NavLink to = "/myprofile/followers" className ={({isActive}) => isActive ?  "activeLink": ""}>Followers</NavLink>
            <NavLink to = "/myprofile/following" className ={({isActive}) => isActive ?  "activeLink": ""}>Following</NavLink>
        </div>
        <Outlet />
    </div>
  )
}

export default ProfileCarHor