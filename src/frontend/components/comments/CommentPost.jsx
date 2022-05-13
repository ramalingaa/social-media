import axios from 'axios'
import React, { useState } from 'react'
import { useAuth } from "../../context/index-context"
import { useSelector, useDispatch } from "react-redux"
import { postActions } from "../../../redux store/postSlice"

const CommentPost = ({pInfo, comment = "", setEditComment = ""}) => {

    const [commentText, setCommentText] = useState(() =>comment ? comment.commentData:"")
    const { jwtToken } = useAuth()
    const { postsData } = useSelector((state) => state.post)
    const dispatch = useDispatch()

    const textChangeHandler = (e) => {
        setCommentText(() => e.target.value)
    }
    const commentClickHandler = async() => {
        if(comment){
            try {
                    const response = await axios.post(`/api/comments/edit/${pInfo._id}/${comment._id}`,{commentData:commentText}, {headers: { authorization: jwtToken } })
                    const newPostsData = postsData.map((post) => {
                        if(post.userName === pInfo.userName){
                            return {...post, comments:response.data.comments}
                        }
                        else {
                            return post
                        }
                    })
                    dispatch(postActions.getPostsData(newPostsData))
                    setCommentText(() => "")
                    setEditComment(() => false)
            
                }catch(e){
                    console.log(e)
                }
        }
       else {
        try {
            const response = await axios.post(`/api/comments/add/${pInfo._id}`,{commentData:commentText}, {headers: { authorization: jwtToken } })
            const newPostsData = postsData.map((post) => {
                if(post.userName === pInfo.userName){
                    return {...post, comments:response.data.comments}
                }
                else {
                    return post
                }
            })
            dispatch(postActions.getPostsData(newPostsData))
            setCommentText(() => "")

        }catch(e){
            console.log(e)
        }
       }
       
    }
  return (
    <div>
        <div className = "comment-wrapper">
            <input type="text"  placeholder = "Write your comments here" className = "comment-input"  onChange = {textChangeHandler} value = {commentText} />
            <button className = "btn primary" onClick = {commentClickHandler}>{comment ? "Update" : "Post"}</button>
        </div>
    </div>
  )
}

export default CommentPost