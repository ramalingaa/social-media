import { createContext, useContext, useState } from "react"
const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)

const AuthProvider = ({children}) => {
    const isUserLoggedIn = JSON.parse(localStorage.getItem("ONE"))
    const [jwtToken, setJwtToken] = useState(isUserLoggedIn?.JWT_TOKEN_ONE)
    const [userProfileData, setUserProfileData] = useState(isUserLoggedIn?.USER_PROFILE_ONE)
    return (
        <AuthContext.Provider value = {{jwtToken, setJwtToken,userProfileData, setUserProfileData}}>
            {children}
        </AuthContext.Provider>
    )
}
export { useAuth, AuthProvider}