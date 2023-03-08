import React, {useState, useEffect} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const BasketScreen: React.FC = () => {
  const dispatch = useDispatch();
    
  return (

    <>

      <div className = "flex justify-center basket-container">
         <h2 className = "heading-secondary basket-heading">Your Basket</h2>
      </div>


    </>


  )
}

export default BasketScreen