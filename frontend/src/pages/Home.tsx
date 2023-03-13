import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import { fetchProducts } from '../actions/product-actions';
import Loader from '../layout/Loader';

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector((state: any) => state.products);

  useEffect(() => {
    const fetchAllProducts = async () => {

        try {
          dispatch(fetchProducts() as any)
          
        } 
        
        catch(error) {

          if(error) {
            console.log(`Error : `, error);
          }

        }
    }

    fetchAllProducts();
  }, [])

  return (

   <>

    <MetaData pageTitle={`Homepage`} />

      {loading ? <div>
        <Loader />

        </div> : (
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


                  <p className ="product-descriptions ">{product.price} </p>
                  <p className = "product-descriptions stock-text">{product.stockCount > 0 ? "In Stock" : "Out Of Stock"}</p>
                  
                  <p>Warranty: 1 Year</p>

                  <button className="product-btn" type = "submit">Product Details</button>
                  </div>
              
              </>
           ))}
  
 
  
     
   </div>
 
 
   </div>
   
 </div>
 
          </>
        )}

  
   

   </>


  )
}

export default Home