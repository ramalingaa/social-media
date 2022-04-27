import React, { useState, useEffect}from 'react'
import { useAuth, usePosts } from "../../context/index-context"
import {Outlet, NavLink } from "react-router-dom"
const ProfileCarHor = () => {
    const { userProfileData } = useAuth()
    const { postsState } = usePosts()
    const { postsData, bookmarksData } = postsState
    const [userPosts, setUserPosts] = useState(0)
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        setUserPosts(() => filteredUserData.length)

    },[postsData])
  return (
    <div >
        <div className = "user-profile-cardH user-name-hor">
            <img src = {userProfileData.badge} alt = "profile badge" className = "avatar lg" />
            <div className = "profile-user-details">
                <p className = "username text-medium" to = "/myprofile">{userProfileData.firstName + " " + userProfileData.lastName}</p>
                <p>{userProfileData.email}</p>
                <div className = "user-name-hor">
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