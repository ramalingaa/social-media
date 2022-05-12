import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { useAuth, usePosts } from "../../context/index-context"
import { CommentsCard, CommentPost } from "../index-components"
const Comments = ({pInfo}) => {

  return (
    <div >
        <CommentPost pInfo = {pInfo}/>
        {pInfo.comments.map((comment) => {
            return <CommentsCard comment = {comment} key = {comment._id} pInfo = {pInfo}/>

        })}
    </div>
  )
}

export default Comments