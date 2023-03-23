import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../actions/order-actions';

const OrderConfirmation: React.FC = () => { // Order Confirmation Page here will send POST request to create a new order
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCreated, setOrderCreated] = useState<boolean>(false);

  const {isAuthenticated} = useSelector((state: any) => state.auth);
  const user = JSON.parse(sessionStorage.getItem("user") as any);
  const orderItems = JSON.parse(localStorage.getItem("orderItems") as any);
  const shippingInformation = JSON.parse(localStorage.getItem("shippingInformation") as any);

  console.log(`User : `, user);
  console.log(`Order Items : `, orderItems)
  console.log(`The shipping infomration : `, shippingInformation);

  const handleCreateOrder = (event): void => {

      try {

         event.preventDefault();
         const userId = user?._id;

         dispatch(createNewOrder(userId, orderItems, shippingInformation, orderItems.itemPrice, orderItems.taxPrice, orderItems.shippingPrice, orderItems.totalPrice) as any);
         
         setOrderCreated((orderCreated) => !orderCreated)

      } 
      
      catch(error) {
         if(error) {
            console.log(error);

            setOrderCreated(false)
         }
      }

  }

  return (

    <>

     {orderCreated && (
       
            <>
              <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded my-4 success-banner">
                  <h2>Your order has been placed successfully</h2>
               </div>
            </>
     )}


    <h2 className = "heading-secondary">Confirm Your Order Below</h2>

      <form onSubmit = {handleCreateOrder} method = "POST">

      <div className ="flex justify-between items-center mb-8 order-container">

  <div>

    <h2 className ="text-lg font-semibold">Your Shipping Information</h2>

    <p className ="text-black-600 mt-2">
      User ID : {shippingInformation.user}
    </p>

    <p className = "text-black-600 mt-2">
        Address: {shippingInformation.address}
    </p>


  </div>


  </div>
      </form>

    </>

  )
}

export default OrderConfirmation