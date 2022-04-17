import React, {useEffect, useState} from 'react'
import { usePosts, useAuth } from "../../context/index-context"
import { likeHandlerFunction } from './likeHandlerFunction'
const FeedCard = ({ pInfo}) => {
    const [postUploader, setPostUploader] = useState({badge:""})
    const { postsState, dispatch } = usePosts()
    const { jwtToken, userProfileData } = useAuth()
    const { usersData } = postsState
    const [likedDisplay, setLikedDisplay] = useState(false)
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
    const likeHandler = likeHandlerFunction(likedDisplay, pInfo, jwtToken, dispatch)
  return (
    <div className = "feedcard-wrapper">
        <div className="user-details-wrapper">
            <img src = {postUploader?.badge} alt = "profile badge" className="avatar"/>
            <p>{pInfo.userName}</p>
        </div>
        <img src={pInfo.image} alt = "feed" className="res-img" />
        <p>{pInfo.content}</p>
        <div className = "feedcard-btn-wrapper">
            <button className= {`btn btn-text ${likedDisplay && "selected"}`} onClick = { likeHandler }><i className="far fa-thumbs-up feed-btn-icon"></i>Like</button>
            <button className="btn btn-text"><i className="fas fa-comment-dots feed-btn-icon"></i>Comment</button>           
        </div>
    </div>
  )
}

export default FeedCard


