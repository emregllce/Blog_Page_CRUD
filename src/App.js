import React from 'react'
import AppRouter from './app-router/AppRouter'
import "./App.css"
import AuthContextProvider from './contexts/AuthContext'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <AuthContextProvider>
        <AppRouter />
        <ToastContainer />
    </AuthContextProvider>
    
  )
}

export default App