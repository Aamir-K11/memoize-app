import React from "react"
import { Route, Routes } from "react-router"
import { AuthContextType } from "./@types/auth"
import { AuthContext } from "./context/auth-context"
import Layout from "./layout/layout"
import NotFound from "./pages/404/404"
import Dashboard from "./pages/dashboard"
import Login from "./pages/login"
import SignUp from "./pages/signup"
import VerifyUser from "./pages/verifyuser"
import Welcome from "./pages/welcome/welcome"
import ProtectedRoute from "./utils/protectedRoute"

function App() {
  
  const {user} = React.useContext(AuthContext) as AuthContextType;
  
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Welcome/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/dashboard" element={
          <ProtectedRoute user={user} redirectPath="/login">
              <Dashboard/>
          </ProtectedRoute>
        }/>
        <Route path="/verify" element={<VerifyUser/>}/>
        <Route path="/*" element={<NotFound/>}/>
      </Routes>
    </Layout>
  )
}

export default App
