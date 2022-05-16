import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { postActions } from './../../../redux store/postSlice';
const UpdateBgImage = ({setUpdateBgPhoto}) => {

    const [newImage, setNewImage] = useState("")
    const [imageTitle, setImageTitle] = useState("")
    const dispatch = useDispatch()
    const { userProfileData } = useSelector((store) => store.post)
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
            dispatch(postActions.getLoggedUserData({...userProfileData, bgImage:newImage.image}))
            setUpdateBgPhoto(() => false)
        }
        else {
            setUpdateBgPhoto(() => false)
        }
    }
    const cancelEditForm = () => {
        setUpdateBgPhoto(() => false)
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

export default UpdateBgImage