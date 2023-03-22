import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const OrderConfirmation: React.FC = () => { // Order Confirmation Page here will send POST request to create a new order
  const dispatch = useDispatch();
  const [orderCreated, setOrderCreated] = useState<boolean>(false);

  const {isAuthenticated} = useSelector((state: any) => state.auth);
  const user = JSON.parse(sessionStorage.getItem("user") as any);
  const orderItems = JSON.parse(localStorage.getItem("orderItems") as any);

  return (

    <>
      <h2 className = "heading-secondary">Confirm Your Order Below</h2>
    </>

  )
}

export default OrderConfirmation