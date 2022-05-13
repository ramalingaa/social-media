import React, { useState, useLayoutEffect } from 'react'
import { useAuth, usePosts } from "../../context/index-context"
import { FollowingCard } from "../index-components"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Following = () => {
    const { userProfileData } = useAuth()
    const { usersData } = useSelector((state) => state.post)
    const [user, setUser] = useState()
    const params = useParams()
    useLayoutEffect (() => {
      const owner = usersData.find((user) => user.username === params.userId)
      setUser(() => owner)
    },[])
  return (
    <div className = "user-profile-cardH">
        {(user ? user : userProfileData).following.map((user) => {
          return(
            <FollowingCard user = {user} key = {user._id}/>
          )
        })}
    </div>
  )
}

export default Following