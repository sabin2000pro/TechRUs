import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createNewProduct } from '../../actions/product-actions';
import { useNavigate } from 'react-router-dom';
import MetaData from '../../layout/MetaData';

const CreateProduct: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [warranty, setWarranty] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [stockCount, setStockCount] = useState<number>(0);
  const [lowStockAlert, setLowStockAlert] = useState(0);

  const [productCreated, setProductCreated] = useState<boolean>(false);
  const {loading, error, user} = useSelector((state: any) => state.auth);

  const handleProductCreate = async (event: any) => {

    try {
      
      event.preventDefault();

        dispatch(createNewProduct(name, description, warranty, price, stockCount, lowStockAlert) as any)

        setName("");
        setDescription("");
        setWarranty("");
        setPrice(0);

        setProductCreated((productCreated) => !productCreated);
        
        setTimeout(() => {
            navigate("/products");
        }, 1500)
    }
    
    catch(error) {

       if(error) {
        return console.error(error);
       }

    }

  }
    
  return (

    <>

    <MetaData pageTitle = {`Inventory System`} />

<div className = "flex justify-center items-center h-screen login-container">

  <form onSubmit = {handleProductCreate} method = "POST" className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container cp-container">

<h2 className = "heading-secondary mb-8">Inventory - Upload Product Data</h2>

  <div className = "mb-4 login-container-inputs username-container">
        <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "name">Name</label>
        <input value = {name} onChange = {(event) => setName(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "name" type = "text" placeholder = "Enter product name" />
  </div>
  
  <div className = "mb-4 login-container-inputs email-container">
        <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "description">Description</label>
        <input value = {description} onChange = {(event) => setDescription(event.target.value)} className = "shadow mb-12 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "description" type = "text" placeholder="Enter product description" />
  </div>

  <div className = "mb-6 login-password-container">
        <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Warranty</label>
        <input value = {warranty} onChange = {(event) => setWarranty(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id = "warranty" type = "text" placeholder = "Enter product warranty" />     
  </div>

  <div className = "mb-6 login-password-container">
        <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "price">Price</label>
        <input value = {price} onChange = {(event) => setPrice(event.target.value as any)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "price" type = "number" placeholder = "Enter product price" />     
  </div>

  <div className = "mb-6 login-password-container">
        <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "stock">Stock</label>
        <input value = {stockCount} onChange = {(event) => setStockCount(event.target.value as any)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "stock" type = "number" placeholder = "Enter product stock" />     
  </div>

  <div className = "mb-6 login-password-container">
        <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Low Stock Alert</label>
        <input value = {lowStockAlert} onChange = {(event) => setLowStockAlert(event.target.value as any)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "price" type = "number" placeholder = "Enter low stock alert" />     
  </div>

  <div className = "flex items-center justify-center login-btn-container">
       <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline cp-button" type="submit">Create Product</button>
  </div>


</form>

</div>

    </>

  )

}

export default CreateProduct