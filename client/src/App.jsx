import React, { useEffect, useState } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Blog from './pages/Blog'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Layout from './pages/admin/Layout'
import Dashboard from './pages/admin/Dashboard'
import AddBlog from './pages/admin/AddBlog'
import ListBlog from './pages/admin/ListBlog'
import Login from './pages/admin/Login'
import "quill/dist/quill.snow.css"
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {

  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      setIsAuthenticated(true)
    }
  }, [])

  return (
    <div>
      <Navbar />
        <Routes>
        
          <Route path='/' element={<Home />} />
          <Route path='/blog/:id' element={<Blog />} />
          <Route path='/admin' element={isAuthenticated ? <Layout /> : <Navigate to="/login" />}>
            <Route index element={<Dashboard />} />
            <Route path='addBlog' element={<AddBlog />} />
            <Route path='listBlog' element={<ListBlog />} />
          </Route>

          <Route path='/login' element={<Login onLogin={() => setIsAuthenticated(true)} />} />
        </Routes>
        <ToastContainer position="top-right" autoClose={3000} />
      <Footer />
    </div>
  )
}

export default App
