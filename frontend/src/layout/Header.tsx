import React  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from './Dropdown';

const Header = () => {
  const dispatch = useDispatch();
  const {loading, error, user} = useSelector((state: any) => state.auth);
  const {basketItems} = useSelector((state: any) => state.basket);

  let currentBasketCount = 0;

  const token = JSON.parse(sessionStorage.getItem("token") as any);

  if(basketItems.length > 0) {
    currentBasketCount =  basketItems.reduce((acc, item) => acc + Number(item.quantity), 0);
  }


  console.log(`Basket Items : `, basketItems);
  console.log(`Current basket coiunt : `, currentBasketCount)


  return (

    <>

     {!loading && !error && (


       <header className = "main-header">

          <div className = "header-container flex justify-between items-center">

        <Link to = '/products'> 
           <img className = "logo-img" src = '/images/techrus.png' />
        </Link>

          <input type = "text" placeholder = "Search Products" />

          <div className = "header-container-right flex justify-end items-center m-4">

              {token ? ( <Dropdown />

              ): (
                   <>

                    <div className = "mr-4 p-4 login-link"> 
                      <Link to = '/user-login'>Login</Link>
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

     )}

    </>


  )
}

export default Header