import React, {useState} from 'react'
import { Link } from 'react-router-dom'

const Header = () => {

  return (

    <>
        <header className = "main-header">

          <div className = "header-container flex justify-between items-center">

           <Link to = '/'> 
              <img className = "logo-img" src = '/images/techrus.png' />
           </Link>

             <input type = "text" placeholder = "Search Products" />

             <div className = "header-container-right flex justify-end items-center m-4">

                <div className = "mr-4 p-4 login-link"> 
                   <Link to = '/user-login'>Login</Link>
                </div>

                <div className = "mr-25">
                   <Link className = "basket-link" to = '/my-basket'>My Basket</Link> 
                   <span className = "basket-count">0</span>
               </div>


           </div>

          </div>


    </header>

    </>


  )
}

export default Header