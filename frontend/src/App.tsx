import { Route, Routes } from "react-router"
import Layout from "./layout/layout"
import Login from "./pages/login"

function App() {
  
  return (
    <Layout>
      <Routes>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </Layout>
  )
}

export default App
