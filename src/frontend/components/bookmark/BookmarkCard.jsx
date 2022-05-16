import React from 'react'
import { FeedCard } from '../index-components'
import { useSelector } from "react-redux"

const BookmarkCard = (postId) => {
    const { postsData } = useSelector((store) => store.post)
    const post = postsData.find((post) => post._id === postId.postId)
  return (
    <div>
        <FeedCard  pInfo = {post} key = {post?._id}/>
    </div>
  )
}

export default BookmarkCard