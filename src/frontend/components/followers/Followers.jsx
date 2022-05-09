import React, {useEffect, useState} from 'react'
import { useAuth, usePosts } from "../../context/index-context"
import { FollowerCard } from "../index-components"
import { useParams } from "react-router-dom"
const Followers = () => {
    const { userProfileData } = useAuth()
    const { postsState } = usePosts()
    const { usersData } = postsState
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