import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import { fetchProducts } from '../actions/product-actions';
import Loader from '../layout/Loader';
import ProductsList from '../dashboard/admin/ProductsList';

const Home: React.FC = () => {
  const dispatch = useDispatch();
  const {loading, products} = useSelector((state: any) => state.products)

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
  }, [dispatch])

  return (

   <>

    <MetaData pageTitle={`Homepage`} />

      {loading ? <div>
        
        <Loader />

        </div> : (

          <>    
            <ProductsList products = {products}  />
          </>

        )}

   </>

  )
}

export default Home