import React, {useState, useEffect} from 'react'
import { useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData'

const BasketScreen: React.FC = () => {
  const {basketItems} = useSelector((state: any) => state.basket)

  console.log(`Basket Items : ,`, basketItems);
    
  return (

    <>    
    <MetaData pageTitle = {`My Basket`} />
    </>


  )
}

export default BasketScreen