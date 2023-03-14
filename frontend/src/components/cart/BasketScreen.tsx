import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { removeProductFromBasket } from '../../actions/basket-actions'

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {basketItems} = useSelector((state: any) => state.basket)
  const applicableTax = 0.2; // 20% VAT tax
  const basketSubtotal = basketItems.reduce((acc, item) => acc + Number(item.price * item.quantity), 0)

  const shippingRate = 0.3;
  const taxPrice = basketSubtotal * applicableTax;
  const shippingPrice = shippingRate;
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
            <div className = "flex justify-center mr-12 bg-white w-1/2 shadow-md rounded ml-12 checkout-card">
                    <h3 className = "text-lg">Total Price: £{parseInt(totalPrice)}</h3>
                    <button className = "px-4 rounded basket-btn mb-5 checkout-btn">Checkout</button>
            </div>

             </>
          ) : null}

    </>


  )
}

export default BasketScreen