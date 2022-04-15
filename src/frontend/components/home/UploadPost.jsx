import React, { useState } from 'react'
import axios from "axios"
import { useAuth, usePosts } from "../../context/index-context"

const UploadPost = () => {
    const { jwtToken, userProfileData } = useAuth()
    const { dispatch } = usePosts()
    const [newPostsData, setNewPostsData] = useState({content:"", image:"", userName:userProfileData})

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
            console.log(newPostsData)
            const response = await axios.post("/api/posts",{postData:newPostsData},{headers:{authorization:jwtToken}})
            dispatch({type:"SET_POSTS_DATA", payload:response.data.posts})
        }catch(e){
            console.log(e)
        }
    }
    return (
    <div className = "feedcard-wrapper">
        <textarea rows = "10" cols = "20" placeholder="start posting something...." onChange = {updateContent}></textarea>
        <div>
            <label>
                <input type = "file" onChange = {uploadImage} accept = ".jpg, .jpeg, .png, .gif"/>
                <i className="fas fa-camera upload-icon"></i>
            </label>
            <button className = "btn primary" onClick = {postNewPostData}>Post</button>
        </div>
    </div>
  )
}

export default UploadPost