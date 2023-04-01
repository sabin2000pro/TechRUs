import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../../layout/MetaData';

const Dashboard: React.FC = () => {

  const dispatch = useDispatch();
  const [productsLoaded, setProductsLoaded] = useState<boolean>(false);
  const {} = useSelector((state: any) => state.products);

  return (
    
    <>
    
      <MetaData pageTitle = {`Store Dashboard`} />
      <h2 className = "heading-primary">Store Inventory Dashboard</h2>

    </>

  )
  
}

export default Dashboard