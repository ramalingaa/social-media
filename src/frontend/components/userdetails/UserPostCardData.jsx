import React, { useState, useEffect} from 'react'
import { UserPostCard } from "../index-components"
import { usePosts, useAuth } from "../../context/index-context"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserPostCardData = () => {
    const { userProfileData } = useAuth()
    const { postsData } = useSelector((state) => state.post)
    const [userPosts, setUserPosts] = useState([])
    const  params = useParams()
    useEffect(() => {
        const useeSpecificData = postsData.filter((post) => post.userName === (params.userId ? params.userId :userProfileData.firstName + userProfileData.lastName))
        setUserPosts(() => useeSpecificData)
    },[postsData])
  return (
    <div className = "userpost-cards-wrapper">
         {userPosts.map((post) =>{
           return <UserPostCard post = {post} key = {post._id}/>
       })}
    </div>
  )
}

export default UserPostCardData