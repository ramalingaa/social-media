import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom"
import { Login, ForgotPassword, Signup, Navbar, Home, UserOwnPosts, UserProfilePage, UserPostCardData, Followers, Following, PostProfilePage } from "./frontend/components/index-components"
import { useAuth } from "./frontend/context/index-context"
import MockAPI from "./MockAPI"

function App() {
  const { jwtToken } = useAuth()
  return (
    <div className="App">
      { jwtToken && <Navbar />}
      <Routes>
        <Route path = "/" element = {jwtToken ? <Home /> : <Navigate to = "/login"/>} />
        <Route path = "/:userId" element = {jwtToken ? <PostProfilePage /> : <Navigate to = "/login"/>}>
            <Route path = "posts" element = {jwtToken ? < UserPostCardData/> : < Navigate to = "/login"/>} />
            <Route path = "followers" element = {jwtToken ? < Followers/> : < Navigate to = "/login"/>} />
            <Route path = "following" element = {jwtToken ? < Following/> : < Navigate to = "/login"/>} />
        </Route>
        <Route path = "/login" element = {jwtToken ? <Navigate to = "/" /> : <Login/>} />
        <Route path = "/signup" element = {jwtToken ? < Navigate to = "/"/> : <Signup/>} />
        <Route path = "/forgotpassword" element = {jwtToken ? < Navigate to = "/"/> : <ForgotPassword/>} />
        <Route path = "/myposts" element = {jwtToken ? < UserOwnPosts/> : < Navigate to = "/login"/>} />
        <Route path = "myprofile" element = {jwtToken ? < UserProfilePage/> : < Navigate to = "/login"/>}>
            <Route path = "posts" element = {jwtToken ? < UserPostCardData/> : < Navigate to = "/login"/>} />
            <Route path = "followers" element = {jwtToken ? < Followers/> : < Navigate to = "/login"/>} />
            <Route path = "following" element = {jwtToken ? < Following/> : < Navigate to = "/login"/>} />
        </Route>
        <Route path = "/mockman" element = { <MockAPI /> } />
      </Routes>
    </div>
  );
}

export default App;
