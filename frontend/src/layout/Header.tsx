import React  from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Dropdown from './Dropdown';

const Header = () => {
  const dispatch = useDispatch();
  const {loading, error, user} = useSelector((state: any) => state.auth);
  const token = JSON.parse(sessionStorage.getItem("token") as any);

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
                <span className = "basket-count">0</span>
            </div>

        </div>

       </div>


 </header>

     )}

    </>


  )
}

export default Header