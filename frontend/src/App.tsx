import { Route, Routes } from "react-router"
import Layout from "./layout/layout"
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
      </Routes>
    </Layout>
  )
}

export default App
