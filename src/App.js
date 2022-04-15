import "./App.css";
import { Routes, Route, Navigate} from "react-router-dom"
import { Login, ForgotPassword, Signup, Navbar, Home} from "./frontend/components/index-components"
import { useAuth } from "./frontend/context/index-context"
import MockAPI from "./MockAPI"

function App() {
  const { jwtToken } = useAuth()
  return (
    <div className="App">
      { jwtToken && <Navbar />}
      <Routes>
        <Route path = "/" element = {jwtToken ? <Home /> : <Navigate to = "/login"/>} />
        <Route path = "/login" element = {jwtToken ? <Navigate to = "/" /> : <Login/>} />
        <Route path = "/signup" element = {jwtToken ? < Navigate to = "/"/> : <Signup/>} />
        <Route path = "/forgotpassword" element = {jwtToken ? < Navigate to = "/"/> : <ForgotPassword/>} />
        <Route path = "/mockman" element = { <MockAPI /> } />
      </Routes>
    </div>
  );
}

export default App;
