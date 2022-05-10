import React, { useState, useLayoutEffect} from 'react'
import { usePosts } from "../../context/index-context"
import { FeedCard } from '../index-components'

const BookmarkCard = (postId) => {
    const { postsState } = usePosts()
    const { postsData } = postsState
    const post = postsData.find((post) => post._id === postId.postId)
  return (
    <div>
        <FeedCard  pInfo = {post} key = {post?._id}/>
    </div>
  )
}

export default BookmarkCard