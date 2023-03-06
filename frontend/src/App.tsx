import { useEffect, useState } from 'react'
import Header from './components/Header'
import {Routes, Route} from 'react-router-dom';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import React from 'react';
import Home from './pages/Home';
import ForgotPassword from './components/authentication/ForgotPassword';

const App: React.FC = () => {
   const [stripeApiKey, setStripeApiKey] = useState("");

   // WILL BE USED FOR THE PAYMENTS SERVICE (WE NEED THE API KEY)
   useEffect(() => {
      
      const fetchStripeKey = async () => {

      }

      fetchStripeKey();

   }, [])

  return (

     <>

      <Header />

        <Home />

        <Routes>
           <Route path = '/customer-register' element = {<Register />} />
           <Route path = '/customer-login' element = {<Login />} />
           <Route path = '/forgot-password' element = {<ForgotPassword />} />
        </Routes>
     </>


  )
}

export default App
