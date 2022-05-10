import React, { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useAuth, usePosts } from "../../context/index-context"
const UserProfileCard = () => {
    const { userProfileData } = useAuth()
    const { postsState } = usePosts()
    const { postsData, bookmarksData } = postsState
    const [userPosts, setUserPosts] = useState(0)
    const [likeCounter, setLikeCounter] = useState(0)
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        const likedData = postsData.filter((post) => post.likes.likedBy.find((user) => user.firstName === userProfileData.firstName))

        setUserPosts(() => filteredUserData.length)
        setLikeCounter(() => likedData.length)

    },[postsData])
  return (
    <div className = "user-profile-cardH">
        <div className = "user-name-badge">
            <img src = {userProfileData.badge} alt = "profile badge" className = "avatar" />
            <div>
                <NavLink className = "username" to = "/myprofile">{userProfileData.firstName + " " + userProfileData.lastName}</NavLink>
            </div>

        </div>
        <NavLink className ={({isActive}) => isActive ?  "postbtn-label-wrapper activeLink": "postbtn-label-wrapper"} to = "/myposts">
            <p>My Posts</p>
            <p className = "profile-count">{userPosts}</p>
        </NavLink>
        <div className = "postbtn-label-wrapper">
            <p>Liked</p>
            <p className = "profile-count">{likeCounter}</p>
        </div>
        <NavLink className ={({isActive}) => isActive ?  "postbtn-label-wrapper activeLink": "postbtn-label-wrapper"} to = "/bookmarks">
            <p>Bookmarks</p>
            <p className = "profile-count">{bookmarksData.length}</p>
        </NavLink>        
    </div>
  )
}

export default UserProfileCard