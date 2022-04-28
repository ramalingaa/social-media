import React from 'react'
import { useAuth } from "../../context/index-context"
import { FollowerCard } from "../index-components"
const Followers = () => {
    const { userProfileData } = useAuth()
  return (
    <div className = "user-profile-cardH">
        {userProfileData.followers.map((user) => {
          return(
            <FollowerCard user = {user} key = {user._id}/>
          )
        })}
    </div>
  )
}

export default Followers