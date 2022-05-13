import React, { useState } from 'react'
import  axios  from 'axios';
import { UploadPost } from '../index-components';
import { useAuth, usePosts } from "../../context/index-context"
import { useClickOutside } from '../../../customeHooks/useClickOutside';
import { useDispatch } from "react-redux"
import { postActions } from './../../../redux store/postSlice';

const EditPostCard = ({post, setDisplayEditPost}) => {
const { jwtToken } = useAuth()
const  dispatch  = useDispatch()
const [editForm, setEditForm] = useState(false)

const deletePost = async() => {
    try {
        const response = await axios.delete(`/api/posts/${post._id}`,{headers:{authorization:jwtToken}})
        dispatch(postActions.getPostsData(response.data.posts))
    }
    catch(e){
        console.log(e)
    }
}
const editPost = () => {
    setEditForm((prev) => !prev)
}
let clickOutside = useClickOutside(setDisplayEditPost)

  return (
    <div ref = {clickOutside}>
        <div className = "editpost-wrapper">
            <button className = "btn edit-btn" onClick = {editPost}>Edit Post</button>
            <button className = "btn edit-btn" onClick = {deletePost}>Delete Post</button>
        </div>
        {editForm && 
        <div className = "edit-from-wrapper">
            <UploadPost content = {post.content} image = {post.image} postId = {post._id} setEditForm = {setEditForm} setDisplayEditPost = {setDisplayEditPost}/>
        </div>
        }
    </div>
  )
}

export default EditPostCard