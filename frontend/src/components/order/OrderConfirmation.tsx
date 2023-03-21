import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrderConfirmation = () => { // Order Confirmation Page here will send POST request to create a new order
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state: any) => state.auth);
  const {} = useSelector((state: any) => state.products);
  const {shippingInfo, loading, error} = useSelector((state: any) => state.shipping)

  const basketItems = localStorage.getItem("basketItems");

  return (

    <>
      <h2>Confirm Your Order Below</h2>


    </>

  )
}

export default OrderConfirmation