import React from 'react'

const FollowerCard = ({user}) => {
  return (
    <div className = "user-name-hor followers-card">
        <img src = {user.badge} alt = "user profile badge" className="avatar"/>
        <div>
            <p className = "follower-card-name">{user.firstName} {user.lastName}</p>
            <p>@{user.username}</p>
        </div>
    </div>
  )
}

export default FollowerCard