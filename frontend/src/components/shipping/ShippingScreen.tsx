import React, {useState} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

const ShippingScreen: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return (

    <>
       <h2>Porduct Shipping Screen</h2>
    </>

  )
}

export default ShippingScreen