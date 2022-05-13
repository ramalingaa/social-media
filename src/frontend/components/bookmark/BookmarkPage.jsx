import React from 'react'
import { BookmarkCard, UserProfileCard } from "../index-components"
import { useSelector } from "react-redux"
const BookmarkPage = () => {

    const { bookmarksData } = useSelector((state) => state.post)
  return (
    <div className = "home-main-wrapper">
    <div>
        <UserProfileCard />
    </div>
    <div>
        {bookmarksData.length < 1 && <p className = "zero-bookmarks-text">There are no posts in bookmarks</p>}
        { bookmarksData.map((postId) => {
                return  <BookmarkCard postId = {postId} key = {postId}/>
                
            })}
    </div>
    <div>
      
    </div>
  </div>
  )
}

export default BookmarkPage