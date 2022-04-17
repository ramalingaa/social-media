import React, { useState } from 'react'
import axios from "axios"
import { useAuth, usePosts } from "../../context/index-context"

const UploadPost = () => {
    const { jwtToken, userProfileData } = useAuth()
    const { dispatch } = usePosts()
    const [newPostsData, setNewPostsData] = useState({content:"", image:"", userName:userProfileData.firstName + userProfileData.lastName})
 
    const uploadImage = (e) => {
        const files = e.target.files
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
        try {
            const response = await axios.post("/api/posts",{postData:newPostsData},{headers:{authorization:jwtToken}})
            dispatch({type:"SET_POSTS_DATA", payload:response.data.posts})
            setNewPostsData(() =>({content:"", image:"", userName:userProfileData.firstName + userProfileData.lastName}))
        }catch(e){
            console.log(e)
        }
    }
    return (
    <div className = "feedcard-wrapper upload-post-wrapper">
        <textarea rows = "10" cols = "20" placeholder="Start a post..." onChange = {updateContent} className="text-area" value = {newPostsData.content}></textarea>
        <div className = "postbtn-label-wrapper">
            <label>
                <input type = "file" onChange = {uploadImage} accept = ".jpg, .jpeg, .png, .gif"/>
                <i className="fas fa-camera-retro upload-icon"></i>
                Photo
            </label>
            <button className = "btn primary" onClick = {postNewPostData}>Post</button>
        </div>
    </div>
  )
}

export default UploadPost