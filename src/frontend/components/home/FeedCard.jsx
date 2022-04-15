import React, {useEffect, useState} from 'react'
import { usePosts, useAuth } from "../../context/index-context"
import axios  from "axios"
const FeedCard = ({ pInfo}) => {
    const [postUploader, setPostUploader] = useState({badge:""})
    const { postsState, dispatch } = usePosts()
    const { jwtToken, userProfileData } = useAuth()
    const { usersData } = postsState
    const [likedDisplay, setLikedDisplay] = useState(false)
    useEffect(() =>{
        const user = usersData.find((user) => (user.firstName + user.lastName) === pInfo.userName)
        setPostUploader(() => user)
        const likedUser = pInfo.likes.likedBy.find((likedUser) => likedUser.firstName + likedUser.lastName === userProfileData)
        if(likedUser){
            setLikedDisplay(() => true)
        }
        else {
            setLikedDisplay(() => false)
        }
    },[pInfo])
    const likeHandler = async() => {
        if(!likedDisplay){
            try {
                const response = await axios.post(`/api/posts/like/${pInfo._id}`, {}, {headers:{authorization:jwtToken}})
                dispatch({type:"SET_POSTS_DATA", payload:response.data.posts})
    
            }catch (e) {
                console.log(e)
            }
        }
        else {
            try {
                const response = await axios.post(`/api/posts/dislike/${pInfo._id}`, {}, {headers:{authorization:jwtToken}})
                dispatch({type:"SET_POSTS_DATA", payload:response.data.posts})
    
            }catch (e) {
                console.log(e)
            }
        }
    }
  return (
    <div className = "feedcard-wrapper">
        <div className="user-details-wrapper">
            <img src = {postUploader?.badge} alt = "profile badge" className="avatar"/>
            <p>{pInfo.userName}</p>
        </div>
        <img src={pInfo.image} alt = "feed" className="res-img" />
        <p>{pInfo.content}</p>
        <div>
            <button className= {`btn btn-text ${likedDisplay && "selected"}`} onClick = { likeHandler }><i className="far fa-thumbs-up feed-btn-icon"></i>Like</button>
            <button className="btn btn-text"><i className="fas fa-comment-dots feed-btn-icon"></i>Comment</button>           
        </div>
    </div>
  )
}

export default FeedCard