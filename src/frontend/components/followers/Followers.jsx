import React, {useEffect, useState} from 'react'
import { FollowerCard } from "../index-components"
import { useParams } from "react-router-dom"
import { useSelector } from "react-redux"

const Followers = () => {
    const { usersData, userProfileData } = useSelector((store) => store.post)
    const [user, setUser] = useState()
    const params = useParams()
    useEffect(() => {
      const owner = usersData.find((user) => user.username === params.userId)
      setUser(() => owner)
    },[])
  return (
    <div className = "user-profile-cardH">
        {(user ? user : userProfileData).followers.map((user) => {
          return(
            <FollowerCard user = {user} key = {user._id}/>
          )
        })}
    </div>
  )
}

export default Followers