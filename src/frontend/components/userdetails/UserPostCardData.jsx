import React, { useState, useEffect} from 'react'
import { UserPostCard } from "../index-components"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const UserPostCardData = () => {
    const { postsData, userProfileData } = useSelector((store) => store.post)
    const [userPosts, setUserPosts] = useState([])
    const  params = useParams()
    useEffect(() => {
        const useeSpecificData = postsData.filter((post) => post.userName === (params.userId ? params.userId :userProfileData.firstName + userProfileData.lastName))
        useeSpecificData.reverse()
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