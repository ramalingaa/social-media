import React, { useState } from 'react'
import { useAuth } from "../../context/index-context"
const UpdateProfileImage = ({setUpdatePhoto}) => {

    const [newImage, setNewImage] = useState("")
    const [imageTitle, setImageTitle] = useState("")
    const { setUserProfileData } = useAuth()

    const uploadImage = (e) => {
        const files = e.target.files
        setImageTitle(() => files[0].name)
        let reader = new FileReader()
        reader.readAsDataURL(files[0])
        reader.onload = (e) => {
            setNewImage((prev) => ({...prev, image:e.target.result}))
        }
    }
    const updateProfilePhoto = () => {
        if(imageTitle){
            setUserProfileData((prev) => ({...prev, badge:newImage.image}))
            setUpdatePhoto(() => false)
        }
        else {
            setUpdatePhoto(() => false)
        }
    }
    const cancelEditForm = () => {
        setUpdatePhoto(() => false)
    }

  return (
    <div className = "edit-form-position update-profile-wrapper">
        { newImage && <img src = {newImage.image} className = "avatar lg" alt = "new avatar"/>}
        <div className = "image-name-btn">
            <label>
                <input type = "file" onChange = {uploadImage}/>
                {imageTitle ? imageTitle : "Click to Add new Image"}
            </label>
            <button onClick = {updateProfilePhoto} className="btn btn-text update-btn">Update</button>
            <i className="fas fa-times cancel-icon" onClick = {cancelEditForm}></i>
         </div>
    </div>
  )
}

export default UpdateProfileImage