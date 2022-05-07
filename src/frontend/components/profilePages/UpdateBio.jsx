import React, { useState } from 'react'
import { useAuth } from "../../context/index-context"

const UpdateBio = ({setUpdateBio}) => {
    const [bioText, setBioText] = useState("")
    const { setUserProfileData } = useAuth()
    const updateBio = (e) => {
        setBioText(() => e.target.value)
    }
    const updateBioHandler = (e) => {
        if(bioText){
            setUserProfileData((prev) => ({...prev, bio: bioText}))
        }
        setUpdateBio(() => false)
    }
    const cancelEditForm = () => {
        setUpdateBio(() => false)
    }
  return (
    <div className = "edit-form-position update-profile-wrapper">
        <div className = "image-name-btn">
            <label>
                <input type = "text" onChange = {updateBio}/>
            </label>
            <button onClick = {updateBioHandler} className="btn btn-text update-btn">Update</button>
            <i className="fas fa-times cancel-icon" onClick = {cancelEditForm}></i>
        </div>
    </div>
  )
}

export default UpdateBio