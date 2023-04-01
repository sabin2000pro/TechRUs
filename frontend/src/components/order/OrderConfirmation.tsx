import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../actions/order-actions';

const OrderConfirmation: React.FC = () => { // Order Confirmation Page here will send POST request to create a new order
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [orderCreated, setOrderCreated] = useState<boolean>(false);

  const {error} = useSelector((state: any) => state.orders);

  const user = JSON.parse(sessionStorage.getItem("user") as any);
  const orderItems = JSON.parse(localStorage.getItem("orderItems") as any);
  const shippingInformation = JSON.parse(localStorage.getItem("shippingInformation") as any);
  const basketItems = JSON.parse(localStorage.getItem("basketItems") as any);

  const handleCreateOrder = (event: any): void => { // Function that's responsible for creating a new order

      try {

         event.preventDefault();
         const userId = user?._id;

         console.log(`Inside create order - current user : `, userId);
         console.log(`Order Items : `, orderItems);
         console.log(`Shipping Info : `, shippingInformation);

         dispatch(createNewOrder(userId, orderItems, shippingInformation, orderItems.itemPrice, orderItems.taxPrice, orderItems.shippingPrice, orderItems.totalPrice) as any);
          
         setTimeout(() => {
            setOrderCreated((orderCreated) => !orderCreated)
            navigate(`/order-success`)
         }, 2500)

      } 
      
      catch(error) {

         if(error) {
            setOrderCreated(false)
         }
      }

  }

  return (

    <>

    {error && (

      <>
          <div className ="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded my-4 success-banner">
            <h2>{error.message}</h2>
          </div>
      </>

    )}

       {orderCreated && (
       
            <>

             <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded my-4 success-banner">
                <h2>Your order has been placed successfully</h2>
              </div>

            </>
     )}


<form onSubmit = {handleCreateOrder} method = "POST">

    <h2 className = "heading-secondary">Confirm Your Order</h2>

     <div className = "place-order-container">
        <button className = "basket-btn">Place Order</button>
     </div>

      
        <div className ="flex justify-between items-center mb-8 order-container">

     <div className = "confirm-container">
    
      <h2 className ="heading-secondary">Your Shipping Information</h2>

        <p className = "text-black-600 mt-2">
          <h4>Address: {shippingInformation.address}</h4>
        </p>

        <p className = "text-black-600 mt-2">
          <h4>Postal Code: {shippingInformation.postalCode}</h4>
        </p>

        <p className = "text-black-600 mt-2">
          <h4>City : {shippingInformation.city}</h4>
        </p>

        <p className = "text-black-600 mt-2">
           <h4>Country: {shippingInformation.country}</h4>
        </p>

  </div>

  </div>

    {basketItems.map((basketItem: any) => (
       
       <>
       
       <div className = "w-1/2 bg-white shadow-md rounded mt-12 basket-card">

          <div className = "flex items-center justify-center mt-12">
              <p className = "text-xl font-medium mb-4"> Product Name: {basketItem.name}</p>
          </div>

          <div className = "flex items-center justify-center">
              <p className = "text-xl font-medium mb-4">Product Price £{basketItem.price}</p>
          </div>

          <div className = "flex items-center justify-center">
              <p className = "text-xl font-medium mb-4">Quantity {basketItem.quantity}</p>
          </div>

          <img className = "product-img-basket ml-5" src = {basketItem.image} alt = "Basket Image Product" />

    </div>

       </>
    ))}

  </form>

    </>

  )
}

export default OrderConfirmation