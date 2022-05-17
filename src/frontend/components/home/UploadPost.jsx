import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { useClickOutside } from '../../../customeHooks/useClickOutside'
import { useDispatch, useSelector } from "react-redux"
import { postActions } from "../../../redux store/postSlice"


const UploadPost = ({setPostUploadToast = "",content = "", image = "", postId = "", setEditForm ="", setDisplayEditPost =""}) => {
    const { jwtToken, userProfileData, theme } = useSelector((store) => store.post)
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
                setImageName(() => "")
                setPostUploadToast((prev) => ({...prev, post: true}))
    
            }catch(e){
                console.log(e)
            }
        }  
    }
    const cancelEditForm = () => {
                setEditForm((prev) => !prev)
                setDisplayEditPost((prev) => !prev)
    }
    const draftPostData = () => {
        const newUserProfileData = {...userProfileData, drafts:userProfileData.drafts.concat({content:newPostsData.content, image: newPostsData.image})}
        dispatch(postActions.getLoggedUserData(newUserProfileData))
        setNewPostsData(() =>({content:"", image:"", userName:userProfileData.firstName + userProfileData.lastName}))
        setPostUploadToast((prev) => ({...prev, draft: true}))

    }
    let clickOutside = useClickOutside(setEditForm)
    return (
    <div className = {`feedcard-wrapper upload-post-wrapper  ${content && "edit-form-position"} ${theme}`} ref = {clickOutside}>
        <textarea rows = "10" cols = "20" placeholder="Start a post..." onChange = {updateContent} className={`text-area ${theme}`} value = {newPostsData.content}></textarea>
        <div className = "postbtn-label-wrapper">
            <label>
                <input type = "file" onChange = {uploadImage} />
                <i className="fas fa-camera-retro upload-icon"></i>
                {imageName ? imageName : "Photo"}
            </label>
            <div>
                {!content && <button className = "btn outlined-primary" onClick = {draftPostData}>Draft</button>}
                <button className = "btn primary" onClick = {postNewPostData}>Post</button>
            </div>
            {content && <i className="fas fa-times cancel-icon" onClick = {cancelEditForm}></i>}
        </div>
    </div>
  )
}

export default UploadPost