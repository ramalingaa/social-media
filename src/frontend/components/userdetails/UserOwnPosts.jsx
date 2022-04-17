import React, { useState, useEffect } from 'react'
import { UserProfileCard, UserPostCard } from "../index-components"
import { usePosts, useAuth } from "../../context/index-context"
const UserOwnPosts = () => {
    const { postsState } = usePosts()
    const { userProfileData } = useAuth()
    const { postsData } = postsState
    const [userPosts, setUserPosts] = useState([])
    useEffect(() => {
        const useeSpecificData = postsData.filter((post) => post.userName === userProfileData.firstName + userProfileData.lastName)
        setUserPosts(() => useeSpecificData)
    },[postsData])
  return (
    <div className = "home-main-wrapper">
    <div>
        <UserProfileCard />
    </div>
    <div>
       {userPosts.map((post) =>{
           return <UserPostCard post = {post}/>
       })}
    </div>
    <div>
      
    </div>
  </div>
    
  )
}

export default UserOwnPosts