import { useEffect, useState } from 'react'
import Header from './layout/Header'
import {Routes, Route} from 'react-router-dom';
import Register from './components/authentication/Register';
import Login from './components/authentication/Login';
import React from 'react';
import Home from './pages/Home';
import ForgotPassword from './components/authentication/ForgotPassword';
import Footer from './layout/Footer';

import ResetPassword from './components/authentication/ResetPassword';

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

        <Routes>
           <Route path = '/products' element = {<Home />} />
           <Route path = '/user-register' element = {<Register />} />
           <Route path = '/user-login' element = {<Login />} />
           <Route path = '/forgot-password' element = {<ForgotPassword />} />
           <Route path = '/reset-password/:resetToken' element = {<ResetPassword />} />
        </Routes>


        <Footer />
     </>


  )
}

export default App
