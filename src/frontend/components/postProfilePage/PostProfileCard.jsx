import React, { useState, useEffect}from 'react'
import {Outlet, NavLink, useParams } from "react-router-dom"
import { useSelector } from 'react-redux'
const PostProfileCard = () => {
    const { postsData, usersData } = useSelector((state) => state.post)
    const [userPosts, setUserPosts] = useState(0)
    const [postOwner, setPostOwner] = useState({})
    let params = useParams()
    useEffect(() => {
        const filteredUserData = postsData.filter((post) => post.userName === params.userId)
        const postUploader = usersData.find((user) => user.username === params.userId)
        setUserPosts(() => filteredUserData)
        setPostOwner(() => postUploader)


    },[postsData])
  return (
    <div >
        <div className = "user-profile-cardH user-name-hor">
            <img src = {postOwner?.badge} alt = "profile badge" className = "avatar lg" />
            <div className = "profile-user-details">
                <p className = "username text-medium" to = "/myprofile">{postOwner?.firstName + " " + postOwner?.lastName}</p>
                <p>@{postOwner?.username}</p>
                <div className = "user-name-hor">
                    <div className = "user-name-hor post-count">
                        <p className = "profile-count">{userPosts.length}</p>
                        <p>Posts</p>
                    </div>
                    <div className = "user-name-hor post-count">
                        <p className = "profile-count">{postOwner?.followers?.length}</p>
                        <p>{postOwner?.followers?.length === 1 ? "Follower" : "Followers"}</p>
                    </div>
                    <div className = "user-name-hor post-count">
                        <p className = "profile-count">{postOwner?.following?.length}</p>
                        <p>Following</p>
                    </div>
                </div>
            </div>
        </div>
        <div className = "user-profile-cardH user-name-hor user-tab-wrapper">
            <NavLink to = {`/${postOwner?.username}/posts`} className ={({isActive}) => isActive ?  "activeLink": ""}>Posts</NavLink>
            <NavLink to = {`/${postOwner?.username}/followers`} className ={({isActive}) => isActive ?  "activeLink": ""}>Followers</NavLink>
            <NavLink to = {`/${postOwner?.username}/following`} className ={({isActive}) => isActive ?  "activeLink": ""}>Following</NavLink>
        </div>
        <Outlet />
    </div>
  )
}

export default PostProfileCard