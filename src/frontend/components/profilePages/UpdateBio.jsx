import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { postActions } from './../../../redux store/postSlice';

const UpdateBio = ({setUpdateBio}) => {
    const [bioText, setBioText] = useState("")
    const dispatch = useDispatch()
    const { userProfileData } = useSelector((store) => store.post)
    const updateBio = (e) => {
        setBioText(() => e.target.value)
    }
    const updateBioHandler = (e) => {
        if(bioText){
            dispatch(postActions.getLoggedUserData({...userProfileData, bio: bioText}))
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