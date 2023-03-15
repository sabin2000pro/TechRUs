import React from 'react'
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

export interface IProductsList {
    products: any
}

const ProductsList: React.FC<IProductsList> = ({products}: IProductsList) => {

  return (

    <>
           <div className  = "flex justify-center">
            
            <div className = "flex w-72 justify-center items-center p-4">

              <div className="flex flex-row gap-6 product-card-container">
 
           {products.map((product: any) => (

              <>
                 <div className="bg-white shadow-md rounded px-12 py-6 product-card">
 
            <div className ="relative w-72 m-4 product-badge-container">
                
                <div className = "absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">{product.isNew ? 'New' : 'Not New'}</div>

                  </div>

                  <h2 className="text-lg font-medium mb-2 heading-secondary">{product.name}</h2>
                  <img className = "product-img mt-5" src = {product.image} />


                  <p className ="product-descriptions ">£{product.price} </p>

                  <p className = "product-descriptions stock-text">{product.stockCount > 0 ? "In Stock" : "Low Stock"}</p>
                  <p className = "product-descriptions text-red-500">{product.stockCount === 0 && "Out Of Stock"}</p>
                

                  <Link to = {`/product-details/${product._id}`} className = "product-btn" type = "submit">Product Details</Link>

                  </div>
              
              </>
           ))}
  
 
  
     
   </div>
 
 
   </div>
   
 </div>
    </>

  )
}

export default ProductsList