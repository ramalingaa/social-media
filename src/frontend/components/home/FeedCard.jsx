import React, {useEffect, useState} from 'react'
import { usePosts, useAuth } from "../../context/index-context"
import { likeHandlerFunction } from './likeHandlerFunction'
import  axios  from 'axios';
const FeedCard = ({ pInfo}) => {
    const [postUploader, setPostUploader] = useState({})
    const { postsState, dispatch } = usePosts()
    const { jwtToken, userProfileData, setUserProfileData } = useAuth()
    const { usersData, bookmarksData } = postsState
    const [likedDisplay, setLikedDisplay] = useState(false)
    const [bookmarkDisplay, setBookmarkDisplay] = useState(false)
    const [followDisplay, setFollowDisplay] = useState(false)
    useEffect(() =>{
        const user = usersData.find((user) => (user.firstName + user.lastName) === pInfo.userName)
        setPostUploader(() => user)
        const likedUser = pInfo.likes.likedBy.find((likedUser) => likedUser.firstName + likedUser.lastName === userProfileData.firstName + userProfileData.lastName)
        if(likedUser){
            setLikedDisplay(() => true)
        }
        else {
            setLikedDisplay(() => false)
        }
      

    },[pInfo])
    useEffect(() => {
        const isPostBookmarked = bookmarksData.find((bookmark) => bookmark._id === pInfo._id)
        if(isPostBookmarked){
            setBookmarkDisplay(() => true)
        }
        else {
            setBookmarkDisplay(() => false)
        }
    },[bookmarksData])
    useEffect(() => {
        const isFollowing = userProfileData.following.find((user) => user.firstName + user.lastName === postUploader.firstName + postUploader.lastName)
        if(isFollowing){
            setFollowDisplay(() =>true)
        }
        else {
            setFollowDisplay(() =>false)
        }

    },[userProfileData])
    const likeHandler = likeHandlerFunction(likedDisplay, pInfo, jwtToken, dispatch)
    const bookmarkPost = async() => {
        if(bookmarkDisplay){
            try {
                const response = await axios.post(`/api/users/remove-bookmark/${pInfo._id}`,{}, { headers: { authorization: jwtToken } })
                
                dispatch({ type: "SET_BOOKMARK_DATA", payload: response.data.bookmarks });
            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                const response = await axios.post(`/api/users/bookmark/${pInfo._id}`,{}, { headers: { authorization: jwtToken } })
                console.log(response.data.bookmarks)
                dispatch({ type: "SET_BOOKMARK_DATA", payload: response.data.bookmarks });
            }
            catch (e) {
                console.log(e)
            }
        }
       
    }
    const followHandler = async() => {
        if(followDisplay){
            try {
                const response = await axios.post(`/api/users/unfollow/${postUploader._id}`,{}, { headers: { authorization: jwtToken } })
                setUserProfileData(() => response.data.user)

            }
            catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                const response = await axios.post(`/api/users/follow/${postUploader._id}`,{}, { headers: { authorization: jwtToken } })
                setUserProfileData(() => response.data.user)
            }
            catch (e) {
                console.log(e)
            } 
        }
    }
  return (
    <div className = "feedcard-wrapper">
        <div className = "postbtn-label-wrapper username-eclipse">
            <div className="user-details-wrapper">
                <img src = {postUploader?.badge} alt = "profile badge" className="avatar"/>
                <p className = "username">{pInfo.userName}</p>
            </div>
            <div>
                <button className = {`btn btn-text ${followDisplay && "selected"}`} onClick = {followHandler}><i className="fas fa-plus"></i> {followDisplay ? "Following" : "Follow"}</button>
            </div>
        </div>
        <img src={pInfo.image} alt = "feed" className="res-img" />
        <p>{pInfo.content}</p>
        <div className = "feedcard-btn-wrapper">
            <button className= {`btn btn-text ${likedDisplay && "selected"}`} onClick = { likeHandler }><i className="far fa-thumbs-up feed-btn-icon"></i>Like</button>
            <button className="btn btn-text"><i className="fas fa-comment-dots feed-btn-icon"></i>Comment</button>     
            <button className={`btn btn-text ${bookmarkDisplay && "selected"}`} onClick = {bookmarkPost}><i className="far fa-star feed-btn-icon"></i>Bookmark</button>      
        </div>
    </div>
  )
}

export default FeedCard


