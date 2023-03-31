import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Dashboard: React.FC = () => {
  const dispatch = useDispatch();
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);
  const {} = useSelector((state: any) => state.products);

  return (
    
    <>

  
      <h2>Store Inventory Dashboard</h2>
    </>

  )
  
}

export default Dashboard