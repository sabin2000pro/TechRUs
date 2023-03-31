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
import UpdateProfile from './components/authentication/UpdateProfile';
import EditProduct from './dashboard/admin/EditProduct';
import UploadProductPhoto from './dashboard/admin/UploadProductPhoto';
import UpdatePassword from './components/authentication/UpdatePassword';
import ProductDetails from './dashboard/admin/ProductDetails';
import UsersList from './dashboard/admin/UsersList';
import ShippingDetails from './components/shipping/ShippingDetails';
import OrderSuccess from './components/order/OrderSuccess';
import OrderConfirmation from './components/order/OrderConfirmation';
import VerifyEmail from './components/authentication/VerifyEmail';
import VerifyLogin from './components/authentication/VerifyLogin';
import MyOrders from './components/order/MyOrders';
import CreateCoupon from './dashboard/admin/coupons/CreateCoupon';
import EditCouponDetails from './dashboard/admin/coupons/EditCouponDetails';
import SingleUser from './dashboard/SingleUser';

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

           <Route path = '/' element = {<Home />} />
           <Route path = '/product-details/:id' element = {<ProductDetails />} />
           <Route path = '/user-register' element = {<Register />} />
           <Route path = '/my-basket' element = {<BasketScreen />} />
           <Route path = '/user-login' element = {<Login />} />
           <Route path = '/forgot-password' element = {<ForgotPassword />} />
           <Route path = '/reset-password/:resetToken' element = {<ResetPassword />} />
           <Route path = '/update-password/:id' element = {<UpdatePassword />} />
           <Route path = '/update-profile/:id' element = {<UpdateProfile />} />
           <Route path = '/my-profile' element = {<Profile />} />

           <Route path = '/verify-email' element = {<VerifyEmail />} />
           <Route path = '/verify-login' element = {<VerifyLogin />} />

           <Route path = '/admin-dashboard' element = {<Dashboard />} />
           <Route path = '/admin-dashboard/create-product' element = {<CreateProduct />} />
           <Route path = '/admin-dashboard/edit-product/:id' element = {<EditProduct /> } />
           <Route path = '/admin-dasboard/upload-product-photo' element = {<UploadProductPhoto />} />
           <Route path = '/admin-dashboard/users' element = {<UsersList />} />
           <Route path = '/shipping' element = {<ShippingDetails />} />
           <Route path = '/order-confirm' element = {<OrderConfirmation /> } />
           <Route path = '/order-success' element = {<OrderSuccess />} />

           <Route path = '/my-orders' element = {<MyOrders />} />
           <Route path = '/create-coupon/:productId' element = {<CreateCoupon />} />
           <Route path = '/edit-coupon/:id' element = {<EditCouponDetails />} />
           <Route path = '/user-details/:id' element = {<SingleUser />} />
           
         </Routes>

        <Footer />

     </>

  )
}

export default App
