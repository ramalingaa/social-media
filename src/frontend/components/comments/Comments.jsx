import React from 'react'
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