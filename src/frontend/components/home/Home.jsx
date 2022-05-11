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
  const sortHandler = (e) => {
    if(e.target.value === "Old"){
      const newFeedData = JSON.parse(JSON.stringify(userFeed)).sort((firstEl, secondEl) => {
        return (new Date(firstEl.creationTime).getTime()) - (new Date(secondEl.creationTime).getTime())
      })
      setUserFeed(() => newFeedData)
    }
    if(e.target.value === "Recent"){
      const newFeedData = JSON.parse(JSON.stringify(userFeed)).sort((firstEl, secondEl) => {
        return (new Date(secondEl.creationTime).getTime()) - (new Date(firstEl.creationTime).getTime())
      })
      setUserFeed(() => newFeedData)
    }
    if(e.target.value === "Trend"){
      const newFeedData = JSON.parse(JSON.stringify(userFeed)).sort((firstEl, secondEl) => {
        return (new Date(secondEl.updatedAt).getTime()) - (new Date(firstEl.updatedAt).getTime())
      })
      setUserFeed(() => newFeedData)
    }

  }
  return (
    <div className = "home-main-wrapper">
      <div>
          <UserProfileCard />
      </div>
      <div>
        <UploadPost />
        <div className = "sort-wrapper">
          <div className = "hr-align">
            <hr />
          </div>
          <div>
            <span>Sort by: </span> 
            <select onChange = {sortHandler}>
              <option>Old</option>
              <option>Trend</option>
              <option>Recent</option>
            </select>
          </div>
        </div>
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