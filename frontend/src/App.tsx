import { Route, Routes } from "react-router"
import Layout from "./layout/layout"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import Welcome from "./pages/welcome"

function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Layout>
  )
}

export default App
