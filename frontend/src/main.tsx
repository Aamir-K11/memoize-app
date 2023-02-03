import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { BrowserRouter } from "react-router-dom";
import './index.css'
import AuthProvider from './context/auth-context';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
       <AuthProvider>
         <App />
       </AuthProvider> 
    </BrowserRouter>
  </React.StrictMode>,
)
