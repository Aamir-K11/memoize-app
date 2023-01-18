import { Route, Routes } from "react-router"
import Layout from "./layout/layout"
import Login from "./pages/login"
import SignUp from "./pages/signup"

function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
      </Routes>
    </Layout>
  )
}

export default App
