import React, { useEffect, useState } from 'react'
import { FeedCard, UploadPost, UserProfileCard, PostUploadToast, DraftUploadPost } from "../index-components"
import { useSelector } from "react-redux"
const Home = () => {
  
  const { postsData, userProfileData } = useSelector((store) => store.post)
  const [userFeed, setUserFeed] = useState([])
  const [ postUploadToast, setPostUploadToast ] = useState({ post: false, draft: false })

  useEffect(() => {
    const postsRenderData = postsData.filter((post) => post.userName !== userProfileData.firstName + userProfileData.lastName)
    setUserFeed(() => postsRenderData)
  },[postsData])
  useEffect(() =>{
    if(postUploadToast.post){
      setTimeout(() => setPostUploadToast((prev) => ({...prev, post:!prev.post})), 3000)
    }
  },[postUploadToast.post])
  useEffect(() =>{
    if(postUploadToast.draft){
      setTimeout(() => setPostUploadToast((prev) => ({...prev, draft:!prev.draft})), 3000)
    }
  },[postUploadToast.draft])
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
        <UploadPost setPostUploadToast = {setPostUploadToast}/>
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
        { postUploadToast.post && <PostUploadToast text = "uploaded"/>}
        { postUploadToast.draft && <DraftUploadPost text = "saved"/>}
      </div>
      
    </div>
  )
}

export default Home