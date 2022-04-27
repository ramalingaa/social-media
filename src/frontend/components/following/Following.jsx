import React from 'react'
import { useAuth } from "../../context/index-context"
import { FollowingCard } from "../index-components"

const Following = () => {
    const { userProfileData } = useAuth()
  return (
    <div className = "user-profile-cardH">
        {userProfileData.following.map((user) => {
          return(
            <FollowingCard user = {user} key = {user._id}/>
          )
        })}
    </div>
  )
}

export default Following