import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth, usePosts } from "../../context/index-context"
const UserProfileCard = () => {
    const { userProfileData } = useAuth()
    const { postsState } = usePosts()
    const { postsData } = postsState
    const [userPosts, setUserPosts] = useState(0)
    const [likeCounter, setLikeCounter] = useState(0)
    const navigate  = useNavigate()
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        const likedData = postsData.filter((post) => post.likes.likedBy.find((user) => user.firstName === userProfileData.firstName))

        setUserPosts(() => filteredUserData.length)
        setLikeCounter(() => likedData.length)

    },[postsData])

    const openUserPosts = () => {
        navigate("/myposts")
    }
  return (
    <div className = "user-profile-cardH">
        <div className = "user-name-badge">
            <img src = {userProfileData.badge} alt = "profile badge" className = "avatar" />
            <p className = "username">{userProfileData.firstName + " " + userProfileData.lastName}</p>
        </div>
        <div className = "postbtn-label-wrapper" onClick = {openUserPosts}>
            <p>My Posts</p>
            <p className = "profile-count">{userPosts}</p>
        </div>
        <div className = "postbtn-label-wrapper">
            <p>Followers</p>
            <p className = "profile-count">2</p>
        </div>
        <div className = "postbtn-label-wrapper">
            <p>Liked</p>
            <p className = "profile-count">{likeCounter}</p>
        </div>
        
    </div>
  )
}

export default UserProfileCard