import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../actions/product-actions';

const CreateProduct: React.FC = () => {
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(0);
  const [lowStockAlert, setLowStockAlert] = useState(0);

  const {loading, error, user} = useSelector((state: any) => state.auth);

  const dispatch = useDispatch();

  const handleProductCreate = async () => {

    try {
        dispatch(createNewProduct(name, description, warranty, price, stockCount, lowStockAlert) as any)
    }
    
    catch(error) {

       if(error) {
        return console.error(error);
       }

    }


  }

  useEffect(() => {
     console.log(`Logged In user : `, user);
  }, [user])
    
  return (

    <>

<div className = "flex justify-center items-center h-screen login-container">

<form onChange = {handleProductCreate} method = "POST" className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container">

<h2 className = "heading-secondary mb-8">Create Product</h2>

  <div className = "mb-4 login-container-inputs username-container">
        <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "username">Address</label>
        <input className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder="Username" />
  </div>
  

    <div className = "mb-4 login-container-inputs email-container">
        <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">City</label>
        <input  className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder="Username" />
  </div>


  <div className = "mb-6 login-password-container">
        <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Phone</label>
   <input className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />
       
  </div>


  <div className = "flex items-center justify-center login-btn-container">

  <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Create Product</button>

  </div>


</form>


</div>

    </>

  )

}

export default CreateProduct