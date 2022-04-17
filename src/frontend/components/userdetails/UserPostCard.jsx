import React, {useState, useEffect} from 'react'
import { useAuth, usePosts } from "../../context/index-context"
import { likeHandlerFunction } from '../home/likeHandlerFunction'

const UserPostCard = ({post}) => {
    const [likedDisplay, setLikedDisplay] = useState(false)

    const { jwtToken, userProfileData } = useAuth()
    const { dispatch } = usePosts()
    const likeHandler = likeHandlerFunction(likedDisplay, post, jwtToken, dispatch)
    useEffect(() =>{
        
        const likedUser = post.likes.likedBy.find((likedUser) => likedUser.firstName + likedUser.lastName === userProfileData.firstName + userProfileData.lastName)
        if(likedUser){
            setLikedDisplay(() => true)
        }
        else {
            setLikedDisplay(() => false)
        }
    },[post])
  return (
    <div className = "feedcard-wrapper">
    <div className="user-details-wrapper">
        <img src = {userProfileData.badge} alt = "profile badge" className="avatar"/>
        <p>{post.userName}</p>
    </div>
    <img src={post.image} alt = "feed" className="res-img" />
    <p>{post.content}</p>
    <div className = "feedcard-btn-wrapper">
        <button className= {`btn btn-text ${likedDisplay && "selected"}`} onClick = { likeHandler }><i className="far fa-thumbs-up feed-btn-icon"></i>Like</button>
        <button className="btn btn-text"><i className="fas fa-comment-dots feed-btn-icon"></i>Comment</button>           
    </div>
</div>
  )
}

export default UserPostCard