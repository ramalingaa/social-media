import React, { useEffect, useState } from 'react'
import { usePosts, useAuth } from "../../context/index-context"
import { FeedCard, UploadPost, UserProfileCard } from "../index-components"
const Home = () => {
  const { postsState } = usePosts()
  const { postsData } = postsState
  const { userProfileData } = useAuth()
  const [userFeed, setUserFeed] = useState([])
  useEffect(() => {
    const postsRenderData = postsData.filter((post) => post.userName !== userProfileData.firstName + userProfileData.lastName)
    setUserFeed(() => postsRenderData)
  },[postsData])
  return (
    <div className = "home-main-wrapper">
      <div>
          <UserProfileCard />
      </div>
      <div>
        <UploadPost />
        { userFeed.map((post) => {
          return <FeedCard  pInfo = {post} key = {post._id}/>
        })}
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default Home