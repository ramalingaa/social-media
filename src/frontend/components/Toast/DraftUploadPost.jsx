import React from 'react'

const DraftUploadPost = ({text}) => {
  
  return (
    <div>
        <p className = {`snackbar cart-toast ${text === "saved" ? "toast-added" :"toast-removed"}`}>Draft {text} Successfully</p>
    </div>
  )
}

export default DraftUploadPost