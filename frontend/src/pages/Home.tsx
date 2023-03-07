import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Home = () => {
  const dispatch = useDispatch();

  return (

   <>
  
     <div className  = "flex justify-center">

        <div className = "flex w-72 justify-center items-center p-4">

       <div className="flex flex-row gap-6 product-card-container">
        
         <div className="bg-white shadow-md rounded px-12 py-6 product-card">

            <div className ="relative w-72 m-4 product-badge-container">
                <div className = "absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
            </div>
    
           <h2 className="text-lg font-medium mb-2 heading-secondary">Product 1</h2>
           <p className ="text-gray-600 text-sm mb-2 product-description ">Product Description </p>
          <button className="product-btn" type = "submit">Product Details</button>
      </div>
  

    <div className="bg-white shadow-md rounded px-8 py-6 product-card">

      <div className ="relative w-72 m-4 product-badge-container">
          <div className ="absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
      </div>

      <h2 className="text-lg font-medium mb-2 heading-secondary">Product 2</h2>
      <p className="text-gray-600 text-sm mb-2 product-description">Description of product 2</p>
      <button className=" product-btn" type="button">Product Details</button>
    </div>


    <div className="bg-white shadow-md rounded px-8 py-6 product-card">

    <div className ="relative w-72 m-4 product-badge-container">
        <div className ="absolute top-0 left-0 py-1 px-2 text-white product-badge font-bold rounded-tl">New</div>
    </div>


      <h2 className="text-lg font-medium mb-2 heading-secondary">Product 3</h2>
      <p className="text-gray-600 text-sm mb-2 product-description">Description of product 3</p>

      <button className = "product-btn" type = "button">Product Details</button>
    </div>
    
  </div>


</div>

    </div>


   </>


  )
}

export default Home