import React, { useState } from 'react'
import axios from 'axios'
import { CommentPost } from "../index-components"
import { useSelector, useDispatch } from "react-redux"
import { postActions } from "../../../redux store/postSlice"
const CommentsCard = ({comment, pInfo}) => {
    const [editComment, setEditComment] = useState(false)
    const { jwtToken } = useSelector((store) => store.post)
    const { postsData, usersData } = useSelector((store) => store.post)
    const dispatch = useDispatch()
    const commentOwner = usersData.find((user) => user.username === comment.username)
  
    const editCommentHandler =  () => {
      setEditComment((prev) => !prev)
   
    }
    const deleteCommentHandler = async () => {
      try {
        const response = await axios.post(`/api/comments/delete/${pInfo._id}/${comment._id}`,{}, {headers: { authorization: jwtToken } })
        const newPostsData = postsData.map((post) => {
            if(post.userName === pInfo.userName){
                return {...post, comments:response.data.comments}
            }
            else {
                return post
            }
        })
        dispatch(postActions.getPostsData(newPostsData))


    }catch(e){
        console.log(e)
    }
    }

  return (
    <div className = "comment-card-wrapper">
        <div className = "user-details-wrapper">
            <img src = {commentOwner?.badge} alt = "profile badge" className="avatar avatar-micro"/>
            {editComment ?<CommentPost pInfo = {pInfo} comment = {comment} setEditComment = {setEditComment}/> : <div className = "comment-text-wrapper">
                <p className = "username">{commentOwner.username}</p>
                <p>{comment.commentData}</p>
                <div className = "comment-btn-wrapper">
                  <button onClick = {editCommentHandler} className = "update-profile-btn"><i className="fas fa-pen"></i></button>
                  <button onClick = {deleteCommentHandler} className = "update-profile-btn"><i className="fas fa-trash-alt"></i></button>
                </div>
            </div>}
        </div>
        
    </div>
  )
}

export default CommentsCard