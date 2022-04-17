import React, { useEffect, useState, useRef } from 'react'
import { useAuth, usePosts } from "../../context/index-context"
const UserProfileCard = () => {
    const { userProfileData } = useAuth()
    const { postsState } = usePosts()
    const { postsData } = postsState
    let userPost = useRef()
    let likeCounter = useRef()
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        const likedData = postsData.filter((post) => post.likes.likedBy.find((user) => user.firstName === userProfileData.firstName))
        userPost.current = filteredUserData.length
        likeCounter.current = likedData.length
    },[postsData])

  return (
    <div className = "user-profile-cardH">
        <div className = "user-name-badge">
            <img src = {userProfileData.badge} alt = "profile badge" className = "avatar" />
            <p className = "username">{userProfileData.firstName + " " + userProfileData.lastName}</p>
        </div>
        <div className = "postbtn-label-wrapper">
            <p>My Posts</p>
            <p className = "profile-count">{userPost.current}</p>
        </div>
        <div className = "postbtn-label-wrapper">
            <p>Followers</p>
            <p className = "profile-count">2</p>
        </div>
        <div className = "postbtn-label-wrapper">
            <p>Liked</p>
            <p className = "profile-count">{likeCounter.current}</p>
        </div>
        
    </div>
  )
}

export default UserProfileCard