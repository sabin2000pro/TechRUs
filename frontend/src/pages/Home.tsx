import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';


const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector((state: any) => state.products);

  useEffect(() => {
    const fetchAllProducts = async () => {

        try {

        } 
        
        catch(error) {

        }
    }

    fetchAllProducts();
  }, [])

  return (

   <>

    <MetaData pageTitle={`Homepage`} />

    {!loading && !error && (

           <div className  = "flex justify-center">
              <div className = "flex w-72 justify-center items-center p-4">
  
                <div className="flex flex-row gap-6 product-card-container">
   
            <div className="bg-white shadow-md rounded px-12 py-6 product-card">
   
               <div className ="relative w-72 m-4 product-badge-container">
                   <div className = "absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
               </div>
       
              <h2 className="text-lg font-medium mb-2 heading-secondary">MacBook Pro 16"</h2>
              <img className = "product-img mt-5" src = '/images/mbpro16.jpg' />
   
   
              <p className ="product-descriptions ">Price: £3999.99 </p>
              <p className = "product-descriptions stock-text">In Stock</p>
              <p>Warranty: 1 Year</p>
   
             <button className="product-btn" type = "submit">Product Details</button>
         </div>
     
   
       <div className="bg-white shadow-md rounded px-8 py-6 product-card">
   
         <div className ="relative w-72 m-4 product-badge-container">
             <div className ="absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
         </div>
   
         <h2 className="text-lg font-medium mb-2 heading-secondary">iPad Pro 12.9"</h2>
   
         <img src = "/images/ipad129.jpg" className = "mt-5 product-img" />
   
         <p className ="product-descriptions ">Price: £3999.99 </p>
         <p className = "product-descriptions stock-text">In Stock</p>
   
         <button className=" product-btn" type="button">Product Details</button>
       </div>
   
   
       <div className="bg-white shadow-md rounded px-8 py-6 product-card">
   
       <div className ="relative w-72 m-4 product-badge-container">
           <div className ="absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
       </div>
   
         <h2 className="text-lg font-medium mb-2 heading-secondary">Product 3</h2>
   
         <img src = "/images/appleseries5.jpg" className = "mt-5 product-img" />
         <p className = "product-descriptions">Price: £999.99</p>
         <p className = "product-descriptions stock-text">In Stock</p>
   
         <button className = "product-btn" type = "button">Product Details</button>
       </div>
       
     </div>
   
   
     </div>
     
   </div>
   
   
    )}


   
   </>


  )
}

export default Home