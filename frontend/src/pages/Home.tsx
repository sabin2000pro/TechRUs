import React, {useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import MetaData from '../layout/MetaData';
import { fetchProducts } from '../actions/product-actions';
import Loader from '../layout/Loader';
import ProductsList from '../dashboard/admin/ProductsList';

const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector((state: any) => state.products)
  const productsPerPage = useSelector((state: any) => state.productsPerPage)
  const {page} = useSelector((state: any) => state.page)

  console.log(`Page : `, page);
  console.log(`Products per Page : `, productsPerPage);

    // Calculate the start and end index of the products to be displayed on the current page
    const startIndex = (page - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
  
    // Get the subset of products to be displayed on the current page
    const displayedProducts = products ? products.slice(startIndex, endIndex) : []

    console.log(`Displayed products : `, displayedProducts);

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

            <ProductsList displayedProducts = {displayedProducts} />
 
          </>

        )}

   </>


  )
}

export default Home