import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchSingleProduct } from '../../actions/product-actions';
import Loader from '../../layout/Loader';
import MetaData from '../../layout/MetaData';
import { addProductToBasket } from '../../actions/basket-actions';
import CreateReview from '../../components/reviews/CreateReview'

const ProductDetails: React.FC = () => {
    const dispatch = useDispatch();
    const {id} = useParams();
    const {loading, error, product} = useSelector((state: any) => state.singleProduct);
    const [quantity, setQuantity] = useState<number>(0);
    const [showReviewModal, setShowReviewModal] = useState<boolean>(false);
    const [itemAddedToBasket, setItemAddedToBasket] = useState<boolean>(false);
    const [isQuantityValid, setIsQuantityValid] = useState<boolean>(false);

    useEffect(() => {

        const fetchSingleProductByID = async () => {

           dispatch(fetchSingleProduct(id as any) as any);
        }

        fetchSingleProductByID(); // Invoke function that fetches the single product

    }, [dispatch])

    const addToBasketHandler = (): void => { // Function that adds a product to basket

        try {

            if(quantity === 0) {
                alert("Cannot add to basket - quantity is 0")
                setIsQuantityValid(false);
            }

            dispatch(addProductToBasket(product._id, quantity) as any);
            setItemAddedToBasket((addedToBasket) => !addedToBasket);

            setTimeout(() => {
                setItemAddedToBasket(false);
            }, 1500)

        } 
        
        catch(error) {

            if(error) {
                setItemAddedToBasket(false);
            }

        }

    }

    const handleCreateReviewModal = () => {
        setShowReviewModal((reviewModal) => !reviewModal);
    }

    return (
        <>

        <MetaData pageTitle = {`Product Details`} />

         {error && (

             <>
               <div className="bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded my-4 success-banner">
                  <h2>{error}</h2>
               </div>
             </>
         )}

         {itemAddedToBasket && (

            <>

               <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded my-4 success-banner">
                  <h2>Added To Basket</h2>
               </div>
               
            </>

         )}

        {loading ? <Loader /> : product && (

            <>

        <div className = "flex flex-row justify-center items-start p-4">

           <div className = "product-details-container">

        <img className = "product-img" src = {product.image} alt = "Product Image" />

        </div>

   <div className = "w-1/2 p-10 bg-white shadow-md rounded mt-12 card-container">

      <h2 className="text-xxl font-medium mb-4 product-heading">{product.name}</h2>

      <p className="text-gray-600 text-sm mb-2">{product.description}</p>

      <div className="flex items-center justify-between mb-4">

        <div className = "flex items-center">

      <button disabled = {quantity === 0} onClick = {() => setQuantity(quantity - 1)} className = "bg-gray-200  py-1 px-2 rounded-l" type = "button">
          <span>-</span>
      </button>

      <span className="bg-gray-200 text-gray-700 py-1 px-4">{quantity}</span>

      <button onClick = {() => setQuantity(quantity + 1)} className = "bg-gray-200 text-gray-700 py-1 px-2 rounded-r" type="button">
         {product.countInStock !== 0 && <span>+</span>}
      </button>

    </div>

    <div className = "flex flex-col justify-between btn-basket-container">

        <button disabled = {product.countInStock === 0} onClick = {addToBasketHandler} className=" px-2 rounded basket-btn mt-12" type="button">
            Add To Basket
        </button>

    </div>

  </div>

      <p className="text-lg font-medium mb-2">Price: £{product.price}</p>
      {product.stockCount >= 3 && <p className = "product-descriptions">In Stock</p>}
      {product.stockCount <= 2 && <p className = "product-descriptions text-orange-700">Low Stock</p>}

         <button disabled = {product.stockCount === 0} onClick = {handleCreateReviewModal} className = "px-2 rounded basket-btn">Create Review</button>
         <CreateReview product = {product} showReviewModal = {showReviewModal} />

    </div>

   </div>

</>

    )}

    
    
        </>
    )
}

export default ProductDetails