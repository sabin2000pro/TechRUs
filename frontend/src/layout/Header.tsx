import React, { useState }  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from './Dropdown';
import { fetchProducts } from '../actions/product-actions';

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const {basketItems} = useSelector((state: any) => state.basket);
  const [keyword, setKeyword] = useState<string>("");

  let currentBasketCount = 0;

  const token = JSON.parse(sessionStorage.getItem("token") as any);

  if(basketItems.length > 0) {
    currentBasketCount =  basketItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  }

  const handleSearch = (event) => { // When a search event occurs
    setKeyword(event.target.value);
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(fetchProducts(keyword) as any);
  }


  return (

    <>

       <header className = "main-header">

          <div className = "header-container flex justify-between items-center">

        <Link to = '/products'> 
           <img className = "logo-img" src = '/images/techrus.png' />
        </Link>

        <form onSubmit = {handleSubmit}>
              <input className = "search-input" onChange = {handleSearch} value = {keyword} type = "text" placeholder = "Search Products" />
         </form>

          <div className = "header-container-right flex justify-end items-center m-4">

              {token ? ( <Dropdown />

              ): (
                   <>

                    <div className = "mr-4 p-4 login-link"> 
                      <Link to = '/user-register'>Register</Link>
                   </div>

                  </>
              )}

             <div className = "mr-25">
                <Link className = "basket-link" to = '/my-basket'>My Basket</Link> 
                <span className = "basket-count">{currentBasketCount}</span>
            </div>

        </div>

       </div>


 </header>

  

    </>


  )
}

export default Header