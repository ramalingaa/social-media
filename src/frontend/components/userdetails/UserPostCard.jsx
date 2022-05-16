import React, {useState, useEffect} from 'react'
import { likeHandlerFunction } from '../home/likeHandlerFunction'
import { EditPostCard } from '../index-components';
import { useSelector, useDispatch } from "react-redux"

const UserPostCard = ({post}) => {
    const [likedDisplay, setLikedDisplay] = useState(false)
    const [displayEditPost, setDisplayEditPost] = useState(false)
    const [postOwner, setPostOwner] = useState({})
    const {  dispatch } = useDispatch()
    const { usersData, jwtToken, userProfileData } = useSelector((store) => store.post)
    
    const likeHandler = likeHandlerFunction(likedDisplay, post, jwtToken, dispatch)
    useEffect(() =>{
        
        const likedUser = post.likes.likedBy.find((likedUser) => likedUser.firstName + likedUser.lastName === userProfileData.firstName + userProfileData.lastName)
        if(likedUser){
            setLikedDisplay(() => true)
        }
        else {
            setLikedDisplay(() => false)
        }
        const owner = usersData.find((user) => user.username === post.userName)
        setPostOwner(() => owner)
    },[post])
    
    const toggleEditPostCard = () => {
        setDisplayEditPost((prev) => !prev)
    }

  return (
    <div className = "feedcard-wrapper">
        <div className = "postbtn-label-wrapper username-eclipse">
            <div className="user-details-wrapper">
                <img src = {postOwner.badge} alt = "profile badge" className="avatar"/>
                <p className = "username">{post.userName}</p>
            </div>
            <div className = "editpost-icon-wrapper">
                <i className="fas fa-ellipsis-v edit-icon" onClick = {toggleEditPostCard}></i>
                <div className = "edit-post">
                    {displayEditPost && <EditPostCard post = {post} setDisplayEditPost = {setDisplayEditPost}/>}
                </div>
            </div>
        </div>
        {post.image && 
        <div>
            {post.image.includes("video") ? <video src = {post.image} className="res-img" controls/> :<img src={post.image} alt = "feed" className="res-img" />}    
        </div>}        
        <p>{post.content}</p>
        <div className = "feedcard-btn-wrapper">
            <button className= {`btn btn-text ${likedDisplay && "selected"}`} onClick = { likeHandler }><i className="far fa-thumbs-up feed-btn-icon"></i>Like</button>
            <button className="btn btn-text"><i className="fas fa-comment-dots feed-btn-icon"></i>Comment</button>
            <button className="btn btn-text"><i className="far fa-star feed-btn-icon"></i>Bookmark</button>           
        </div>
    </div>
  )
}

export default UserPostCard