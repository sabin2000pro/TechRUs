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
import BasketScreen from './components/cart/BasketScreen';
import Profile from './components/authentication/Profile';
import Dashboard from './dashboard/admin/Dashboard';
import CreateProduct from './dashboard/admin/CreateProduct';

const App: React.FC = () => {
   const [stripeApiKey, setStripeApiKey] = useState("");

   // WILL BE USED FOR THE PAYMENTS SERVICE (WE NEED THE API KEY)
   useEffect(() => {

      const fetchStripeKey = async () => {
         try {
            console.log(`The stripe key : `, stripeApiKey);

            setStripeApiKey(stripeApiKey);
         }
         
         catch(error) {
            if(error) {
               return console.error(error);
            }
         }


      }

      fetchStripeKey();

   }, [])

  return (

     <>

      <Header />       

        <Routes>
           <Route path = '/products' element = {<Home />} />
           <Route path = '/user-register' element = {<Register />} />
           <Route path = '/my-basket' element = {<BasketScreen />} />
           <Route path = '/user-login' element = {<Login />} />
           <Route path = '/forgot-password' element = {<ForgotPassword />} />
           <Route path = '/reset-password/:resetToken' element = {<ResetPassword />} />

           <Route path = '/my-profile' element = {<Profile />} />
           <Route path = '/admin-dashboard' element = {<Dashboard />} />
           <Route path = '/admin-dashboard/create-product' element = {<CreateProduct } />
        </Routes>


        <Footer />
     </>


  )
}

export default App
