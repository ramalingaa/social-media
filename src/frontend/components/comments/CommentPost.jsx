import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuth, usePosts } from "../../context/index-context"

const CommentPost = ({pInfo, comment = "", setEditComment = ""}) => {

    const [commentText, setCommentText] = useState(() =>comment ? comment.commentData:"")
    const { jwtToken } = useAuth()
    const { postsState, dispatch } = usePosts()
    const { postsData } = postsState
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
                    console.log(newPostsData)
                    dispatch({ type: "SET_POSTS_DATA", payload:newPostsData})
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
            dispatch({ type: "SET_POSTS_DATA", payload:newPostsData})
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