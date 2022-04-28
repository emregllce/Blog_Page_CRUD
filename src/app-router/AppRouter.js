import React from 'react'
import Navbar from '../components/Navbar'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Dashboard from "../pages/Dashboard"
import Login from "../pages/Login"
import Details from "../pages/Details"
import NewBlog from "../pages/NewBlog"
import Register from "../pages/Register"
import UpdateBlog from "../pages/UpdateBlog"
import NotFound from "../pages/NotFound"
import Profile from "../pages/Profile"
import DashboardStyle from '../pages/DashboardStyle'

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path = "/" element={<Dashboard />} />
        <Route path = "/profile" element={<Profile />} />
        <Route path = "/login" element={<Login />} />
        <Route path = "/details/:id" element={<Details />} />
        <Route path = "/newblog" element={<NewBlog />} />
        <Route path = "/dashstyle" element={<DashboardStyle />} />
        <Route path = "/register" element={<Register />} />
        <Route path = "/updateblog/:id" element={<UpdateBlog />} />
        <Route path = "*" element={<NotFound />} />

      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter