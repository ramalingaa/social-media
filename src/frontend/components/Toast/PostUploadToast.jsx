import React from 'react'

const PostUploadToast = ({text}) => {
  
  return (
    <div>
        <p className = {`snackbar cart-toast ${text === "uploaded" ? "toast-added" :"toast-removed"}`}>Post {text} Successfully</p>
    </div>
  )
}

export default PostUploadToast