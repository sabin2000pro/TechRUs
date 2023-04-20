import React, { useState } from 'react'
import { Menu} from '@headlessui/react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { logout } from '../actions/auth-actions'

function classNames(...classes: any[]) {
  return classes.filter(Boolean).join(' ')
}

const Dropdown: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoggedOut, setIsLoggedOut] = useState<boolean>(false);

    const onLogoutHandler = () => {

        try {

           dispatch(logout() as any);
           setIsLoggedOut((isLoggedOut) => !isLoggedOut);

           setTimeout(() => {
            
            navigate(`/user-login`);
            window.location.reload(); // REload page to remove account settings after logged out

           }, 800)
        } 
        
        catch(error) {

           if(error) {
             setIsLoggedOut(false);
           }

        }
    }

  return (

    <Menu as = "div" className = "relative inline-block text-left">


      <div className = "dropdown-container">

        <Menu.Button className = "inline-flex w-full justify-center gap-x-1.5 rounded-md dropdown-btn px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300">
           Account Settings
        </Menu.Button>

      </div>

        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">

          <div className = "py-1">

            <Menu.Item> 
                
            {({ active }) => (

          <Link to = '/my-profile' className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')}>
               My Profile
             </Link>

              )}

            </Menu.Item>

            <Menu.Item>

              {({ active }) => (

                <Link to = '/my-orders' className = {classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block px-4 py-2 text-sm')} >My Orders</Link>

              )}

            </Menu.Item>

            <form method = "POST">

              <Menu.Item>

                {({ active }) => (

                  <button onClick = {onLogoutHandler} type = "submit" className={classNames( active ? 'bg-gray-100 text-gray-900' : 'text-gray-700', 'block w-full px-4 py-2 text-left text-sm')}>Logout</button>
                )}

              </Menu.Item>

            </form>

          </div>

        </Menu.Items>

    </Menu>

  )
}

export default Dropdown