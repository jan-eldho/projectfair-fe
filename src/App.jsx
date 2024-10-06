import { useState } from 'react'

import './App.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Auth from './pages/Auth'
import Dashboard from './pages/Dashboard'
import Project from './pages/Project'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {


  return (
    <>
    
    <Routes>
      <Route path='/' element={ <Home />} />
      <Route path='/login' element={  <Auth />} />
      <Route path='/register' element={  <Auth register={"register"} /> } />
      <Route path='/dashboard' element={   <Dashboard />} />
      <Route path='/projects' element={    <Project />} />
    </Routes>
      <Footer />
      <ToastContainer />
    </>
  )
}

export default App
