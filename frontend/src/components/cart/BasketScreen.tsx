import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
  const {basketItems} = useSelector((state: any) => state.basket)

  console.log(`Basket Items : ,`, basketItems);
    
  return (

    <>    

    </>


  )
}

export default BasketScreen