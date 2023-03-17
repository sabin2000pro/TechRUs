import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrderConfirmation = () => { // Order Confirmation Page here will send POST request to create a new order
  const dispatch = useDispatch();
  const {isAuthenticated, user} = useSelector((state: any) => state.auth);
  const {} = useSelector((state: any) => state.products);

  return (

    <>
      <h2>Confirm Your Order</h2>
    </>

  )
}

export default OrderConfirmation