import { useState } from 'react'
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom';
import Register from './pages/Register';
import Login from './pages/Login';
import React from 'react';

const App: React.FC = () => {

  return (

     <>
        <Header />

        <Routes>
           <Route path = '/customer-register' element = {<Register />} />
           <Route path = '/customer-login' element = {<Login />} />
        </Routes>
     </>


  )
}

export default App
