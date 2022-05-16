import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useClickOutside } from '../../../customeHooks/useClickOutside'
import { useDispatch, useSelector } from "react-redux"
import { postActions } from "../../../redux store/postSlice"


const UploadPost = ({content = "", image = "", postId = "", setEditForm ="", setDisplayEditPost =""}) => {
    const { jwtToken, userProfileData } = useSelector((store) => store.post)
    const  dispatch  = useDispatch()
    const [newPostsData, setNewPostsData] = useState({content:content, image:image, userName:userProfileData.firstName + userProfileData.lastName})
    const navigate = useNavigate()
    const [imageName, setImageName] = useState("")

    const uploadImage = (e) => {
        const files = e.target.files
        setImageName(() => files[0].name)
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewPostsData((prev) => ({...prev, image:e.target.result}))
        }
       

    }
    const updateContent = (e) => {
        setNewPostsData((prev) => ({...prev, content:e.target.value}))
    }
    const postNewPostData = async() => {
        if(content){
            try {
                const response = await axios.post(`/api/posts/edit/${postId}`,{postData:newPostsData},{headers:{authorization:jwtToken}})
                dispatch(postActions.getPostsData(response.data.posts))
                setNewPostsData(() =>({content:"", image:"", userName:userProfileData.firstName + userProfileData.lastName}))
                navigate("/myposts")
                setEditForm((prev) => !prev)
                setDisplayEditPost((prev) => !prev)
                
            }catch(e){
                console.log(e)
            }  
        }
        else {
            try {
                const response = await axios.post("/api/posts",{postData:newPostsData},{headers:{authorization:jwtToken}})
                dispatch(postActions.getPostsData(response.data.posts))
                setNewPostsData(() =>({content:"", image:"", userName:userProfileData.firstName + userProfileData.lastName}))
                navigate("/myposts")
    
            }catch(e){
                console.log(e)
            }
        }  
    }
    const cancelEditForm = () => {
                setEditForm((prev) => !prev)
                setDisplayEditPost((prev) => !prev)
    }
    let clickOutside = useClickOutside(setEditForm)
    return (
    <div className = {`feedcard-wrapper upload-post-wrapper ${content && "edit-form-position"}`} ref = {clickOutside}>
        <textarea rows = "10" cols = "20" placeholder="Start a post..." onChange = {updateContent} className="text-area" value = {newPostsData.content}></textarea>
        <div className = "postbtn-label-wrapper">
            <label>
                <input type = "file" onChange = {uploadImage} />
                <i className="fas fa-camera-retro upload-icon"></i>
                {imageName ? imageName : "Photo"}
            </label>
            <button className = "btn primary" onClick = {postNewPostData}>Post</button>
            {content && <i className="fas fa-times cancel-icon" onClick = {cancelEditForm}></i>}
        </div>
    </div>
  )
}

export default UploadPost