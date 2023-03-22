import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { useNavigate } from 'react-router-dom'
import { removeProductFromBasket } from '../../actions/basket-actions'

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {basketItems} = useSelector((state: any) => state.basket) // Pull out the basket items from state

  const navigate = useNavigate();
  const applicableTax = 0.2; // 20% VAT tax
  const basketSubtotal = basketItems.reduce((acc, item) => acc + Number(item.price * item.quantity), 0)

  const taxPrice = basketSubtotal * applicableTax;
  const shippingPrice = basketSubtotal < 1000 ? 1.99 : 2.99;
  const totalPrice = basketSubtotal + taxPrice + shippingPrice;


  const onRemoveProductHandler = (id: string) => {

    try {
       dispatch(removeProductFromBasket(id) as any)
    } 
    
    catch(error) {


      if(error) {
        return console.error(error);
      }
    }


  }

  const handleShippingNavigate = () => {

    const orderItems = basketItems.map((item: any) => {
      return {product: item.product, taxPrice, shippingPrice, totalPrice};
    });

    localStorage.setItem("orderItems", JSON.stringify(orderItems));

    navigate('/shipping')

  }
    
  return (

    <>   

    <MetaData pageTitle = {`My Basket`} />

    {basketItems.length === 0 && <h2 className = "heading-secondary">Your Cart Is Empty</h2>}

       {basketItems.map((basketItem: any) => (

        <>

          <div className = "w-1/2 bg-white shadow-md rounded mt-12 basket-card">

        <div className = "flex items-center justify-center mt-12">
            <p className = "text-xl font-medium mb-4"> Product Name: {basketItem.name}</p>
        </div>

        <div className = "flex items-center justify-center">
          <p className = "text-xl font-medium mb-4">Product Price: £{basketItem.price}</p>
        </div>

        <div className = "flex items-center justify-center">
          <p className = "text-xl font-medium mb-4">Quantity: {basketItem.quantity}</p>
        </div>

    <img className = "product-img-basket ml-5" src = {basketItem.image} alt = "Basket Image Product" />

     <div className = "flex items-center justify-end">
        <button onClick = {() => onRemoveProductHandler(basketItem.product)} className=" px-4 rounded basket-btn mb-5" type="button">Remove</button>
     </div>
       
       </div>


         </>

         
       ))}

          {basketItems.length > 0 ? (

             <>

         <div className = "flex justify-center bg-white w-1/2 shadow-md rounded ml-12 checkout-card">
             <h2 className="heading-secondary order-heading">Order Summary</h2>

    <hr/>

    <div className = "flex flex-col px-4 py-2">

        <div className = "flex justify-between mb-2">
            <h3 className="text-lg mr-3">Subtotal:</h3>
            <h3 className="text-md">£{basketSubtotal.toFixed(2)} </h3>
        </div>

        <div className="flex justify-between mb-2">
            <h3 className="text-md">Tax:</h3>
            <h3 className="text-md">£{taxPrice.toFixed(2)}</h3>
        </div>

        <div className="flex justify-between mb-2">
            <h3 className="text-md">Shipping:</h3>
            <h3 className="text-md">£{shippingPrice.toFixed(2)}</h3>
        </div>

        <div className="flex justify-between mb-2">
            <h3 className="text-lg">Total:</h3>
            <h3 className="text-lg">£{totalPrice.toFixed(2)}</h3>
        </div>

        <button onClick = {handleShippingNavigate} className = "px-4 rounded basket-btn mb-5 checkout-btn">Checkout</button>

    </div>


</div>

 </>
          ) : null}

    </>


  )
}

export default BasketScreen