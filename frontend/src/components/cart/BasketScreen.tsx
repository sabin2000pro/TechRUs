import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import MetaData from '../../layout/MetaData'
import { removeProductFromBasket } from '../../actions/basket-actions'

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {basketItems} = useSelector((state: any) => state.basket)


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
      <p className = "text-xl font-medium mb-4"> {basketItem.name}</p>
   </div>

    <div className = "flex items-center justify-center">
    <p className = "text-xl font-medium mb-4">£{basketItem.price}</p>
    </div>

    <img className = "product-img-basket ml-5" src = {basketItem.image} alt = "Basket Image Product" />

     <div className = "flex items-center justify-end">
        <button onClick = {() => onRemoveProductHandler(basketItem._id)} className=" px-4 rounded basket-btn mb-5" type="button">Remove</button>
     </div>
       
       </div>

         </>
       ))}
    </>


  )
}

export default BasketScreen