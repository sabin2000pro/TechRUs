import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../actions/product-actions';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';

const ProductDetails = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {loading, error, product} = useSelector((state: any) => state.singleProduct);

    useEffect(() => {
        
        const fetchSingleProductByID = async() => {
             dispatch(fetchSingleProduct(id) as any);
        }

        fetchSingleProductByID();
    }, [])

    return (
        <>

        <MetaData pageTitle = {`Product Details`} />

        {loading ? <Loader /> : (
            <>
             <div className="flex flex-row justify-center items-start p-4">

<div className = "product-details-container">

  <img  className = "product-img" src = '/images/airpods.jpg' alt = "Airpods Image" />


</div>

<div className = "w-1/2 p-10 bg-white shadow-md rounded mt-12">

  <h2 className="text-xl font-medium mb-4">Airpods</h2>
  <p className="text-gray-600 text-sm mb-2">Descr</p>

  <div className="flex items-center justify-between mb-4">

    <div className="flex items-center">

      <button className="bg-gray-200  py-1 px-2 rounded-l" type="button">
        -
      </button>

      <span className="bg-gray-200 text-gray-700 py-1 px-4">0</span>

      <button className="bg-gray-200 text-gray-700 py-1 px-2 rounded-r" type="button">
        +
      </button>


    </div>


    <button className=" px-4 rounded basket-btn" type="button">
      Add to basket
    </button>
  </div>


  <p className="text-lg font-medium mb-2">£5999.99</p>
  <p className="text-gray-600 text-sm">In Stock</p>
</div>
</div>
            </>
        )}
            

        </>
    )
}

export default ProductDetails