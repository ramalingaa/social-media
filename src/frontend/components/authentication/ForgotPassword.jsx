import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"


const ForgotPassword = () => {
    
    const [showPassword, setShowPassword] = useState({password:false, reEnterPasswrod:false})
    const [isPasswordMatch, setISPasswordMatch] = useState(true)
    const [newUserData, setNewUserData] = useState({email:"", password:"",name:""})

    const navigate  = useNavigate()

    const toggleDisplayPassword = () => {
        setShowPassword((prev) => ({...prev, password:!(prev.password)}))
    }
    const toggleReDisplayPassword = () => {
        setShowPassword((prev) => ({...prev, reEnterPasswrod:!(prev.reEnterPasswrod)}))
    }
    const checkPassword = (e) => {
        newUserData.password === e.target.value ? setISPasswordMatch(() => true) : setISPasswordMatch(() => false)
    }
    const signupUser = async () => {
        try {
            const response = await axios.post("/api/auth/signup",newUserData)
            navigate("/login")
        }catch (e){
            console.log("signup failed",e)
        }
    }
    

  return (
    <div className = "login-landing-wrapper">  
        <div className = "login-title-wrapper">
            <h1 className = "login-logo-title">One Mile</h1>
            <p className = "title-subtext">One Mile  helps you connect and share with the people in your life.</p>
        </div>
        <div className = "login-page-wrapper">
            <div className = "login-card-wrapper">
                <p className = "text-large login-header">Forgot Password</p>
                <label className = "input-label">
                    <input type = "email" placeholder = " "  name = "email"className = "i-text input-name login-input"/>
                    <span className = "input-placeholder">Email Address</span>
                </label>
                <label className = "input-label password-wrapper">
                    <input type = {showPassword.password ? "text" : "password"} name = "password" placeholder = " " className = "i-text input-name login-input" />
                    <span  className = "input-placeholder">Enter New Password</span>
                    <button className = "show-password" onClick = {toggleDisplayPassword}>{showPassword.password ? <i className="fas fa-eye "></i> : <i className="fas fa-eye-slash"></i>}</button>
                    
                </label>
                <label className = "input-label password-wrapper">
                    <input type = {showPassword.reEnterPasswrod ? "text" : "password"} placeholder = " " className = "i-text input-name login-input" onChange = {checkPassword}/>
                    <span  className = "input-placeholder">Re Enter New Password</span>
                    <button className = "show-password" onClick = {toggleReDisplayPassword}>{showPassword.reEnterPasswrod ? <i className="fas fa-eye "></i> : <i className="fas fa-eye-slash"></i>}</button>
                    {!isPasswordMatch && <p className ="error-msg">Passwords don't match</p>}
                </label>
            
                <button className = "btn primary" onClick = {signupUser}>Reset Password</button>
                <Link to = "/login"><p className = "login-header create-account">Already Have an Account? Login</p></Link>
            </div>
        </div>
    </div>
  )
};

export default ForgotPassword;