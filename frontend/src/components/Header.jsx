import React from 'react'

const Header = () => { // Header component

  return (

    <>
       <header className = "main-header">

          <nav className = "main-nav">

              <ul className = "main-nav-list">

                <li>
                    <a href = "#">Register</a>
                </li>

                <li>
                    <a href = "#">Cart</a>
                </li>

              </ul>


          </nav>

       </header>
        
    </>

  )

}

export default Header