import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../../actions/auth-actions';
import { Link } from 'react-router-dom';

const ShippingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const {shipping} = useSelector((state: any) => state.shipping);
  const {isAuthenticated, user} = useSelector((state: any) => state.auth)

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");

  useEffect(() => {

      const loadUser = async () => {
          dispatch(fetchLoggedInUser() as any);
      }

      loadUser();
  }, [dispatch])

  const handleShippingSubmit = (event) => {

    try {
       event.preventDefault();
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }

  }

  return (

    <>

       <div className = "flex justify-center items-center h-screen login-container">

          <form onSubmit = {handleShippingSubmit} method = "POST" className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container">

            <h2 className = "heading-secondary mb-8">Your Shipping Details</h2>

              <div className = "mb-4 login-container-inputs username-container">
                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "username">Address</label>
                  <input className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "address" type = "text" placeholder="Enter Shipping Address" />
              </div>
              

              <div className = "mb-4 login-container-inputs email-container">
                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">City</label>
                  <input className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "username" type = "text" placeholder = "Username" />
            </div>


              <div className = "mb-6 login-password-container">
                    <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Phone</label>
                    <input className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "password" type = "password" placeholder = "Enter your password" />  
              </div>


            <div className = "flex items-center justify-center login-btn-container">
                <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Place Order</button>
            </div>

   </form>
</div>

    </>

  )
}

export default ShippingDetails