import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { UserProfile } from "../index-components"
import { useSelector, useDispatch } from "react-redux"
import { postActions } from './../../../redux store/postSlice';

const Navbar = () => {
  const { jwtToken, serverData, theme } = useSelector((store) => store.post)
  const dispatch = useDispatch()
  const [profileDisplay, setProfileDisplay] = useState(false)
  const toggleProfileCard = () => {
    setProfileDisplay((prev) => !prev)
  }
  const searchChangeHandler = (e) => {
    const searchPostData = serverData.filter((post) => post.userName.includes(e.target.value.toLowerCase()))
    dispatch(postActions.getPostsData(searchPostData))
  }
  const debounceFunction = (fn, delay) => {
    let timer;
    return (e) => {
      if(timer){
        clearTimeout(timer)
      }
      timer = setTimeout(() =>fn(e),delay)
    }
  }
  const debounceChangeHandler = debounceFunction(searchChangeHandler, 300)
  const toggleTheme = () => {
    if(theme === "light"){
      dispatch(postActions.getTheme("dark"))
      localStorage.setItem("theme", "dark")
    }
    else {
      dispatch(postActions.getTheme("light"))
      localStorage.setItem("theme", "light")
    }
  }
  return (
    <main className = {`navbar-main-wrapper`}>
      <nav className={`navbar ${theme}`}>
      <Link to = "/" className="navbar-logo">
          <h2>One Mile</h2>
      </Link>
      {jwtToken && 
      <div className = "page-links">
        <input type = "text" className="i-text navbar-search" onChange = {debounceChangeHandler} placeholder = "Search posts by username"/>
        <i className="fa-solid fa-magnifying-glass search-icon"></i>
        <i className="far fa-user nav-icon" onClick = {toggleProfileCard}></i>
        <button onClick = {toggleTheme} className = "btn btn-text"><i className="fa-solid fa-circle-half-stroke"></i></button>
      </div>
      }
      
      {profileDisplay && 
        <UserProfile setProfileDisplay = {setProfileDisplay}/>
    
       }
       
      
      </nav>
    </main>
  )
}

export default Navbar