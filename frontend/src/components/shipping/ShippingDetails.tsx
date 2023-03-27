import React, {useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLoggedInUser } from '../../actions/auth-actions';
import { useNavigate } from 'react-router-dom';
import { createNewShipping } from '../../actions/shipping-actions';

const ShippingDetails: React.FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = JSON.parse(sessionStorage.getItem("user") as any);
  const {error} = useSelector((state: any) => state.auth)

  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [postalCode, setPostalCode] = useState<string>("");
  const [phoneNo, setPhoneNo] = useState<string>("");
  const [shippingDetailsSubmitted, setShippingDetailsSubmitted] = useState<boolean>(false);

  useEffect(() => { // On page load

      const loadUser = async () => { // Fetch the logged in user
          dispatch(fetchLoggedInUser() as any);
      }

      loadUser();

  }, [dispatch])

  const handleShippingSubmit = (event): void => {

    try {

        event.preventDefault();
        dispatch(createNewShipping(user._id, address, city, country, postalCode, phoneNo) as any);

        setShippingDetailsSubmitted((shippingDetailsSubmitted) => !shippingDetailsSubmitted)
        navigate(`/order-confirm`);
    } 
    
    catch(error) {

      if(error) {
        return console.error(error);
      }

    }

  }

  return (

    <>

       {error && (

        <>
          
        <div className = "bg-red-200 border border-red-400 text-red-700 px-4 py-3 rounded my-4 success-banner">
            <h2>{error.message}</h2>
        </div>

        </>

       )}

        {shippingDetailsSubmitted && (

        <div className="bg-green-200 border border-green-400 text-green-700 px-4 py-3 rounded my-4 success-banner">
            <h2>Shipping Details Submitted</h2>
        </div>

        )}

       <div className = "flex justify-center items-center h-screen shipping-container">

          <form onSubmit = {handleShippingSubmit} method = "POST" className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container">

            <h2 className = "heading-secondary mb-8">Your Shipping Details</h2>

              <div className = "mb-4 login-container-inputs username-container">
                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "address">Address</label>
                  <input value = {address} onChange = {(event) => setAddress(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "address" type = "text" placeholder = "Enter Shipping Address" />
              </div>
              
            <div className = "mb-4 login-container-inputs email-container">
                  <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "city">City</label>
                  <input value = {city} onChange = {(event) => setCity(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" id = "city" type = "text" placeholder = "Enter City" />
            </div>

            <div className = "mb-4 login-container-inputs email-container">
                  <label className = "block text-sm font-bold mb-2 login-username-label" htmlFor = "country">Country</label>
                  <input value = {country} onChange = {(event) => setCountry(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" id = "username" type = "text" placeholder = "Country" />
            </div>

            <div className = "mb-4 login-container-inputs email-container">
                  <label className = " block text-sm font-bold mb-2 login-username-label" htmlFor = "email">Postal Code</label>
                  <input value = {postalCode} onChange = {(event) => setPostalCode(event.target.value)} className = "shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline mb-6" id = "postalcode" type = "text" placeholder = "Postal Code" />
            </div>

             <div className = "mb-6 login-password-container">
                  <label className = "block text-sm font-bold mb-2 login-password-label" htmlFor = "password">Phone</label>
                  <input value = {phoneNo} onChange = {(event) => setPhoneNo(event.target.value)} className ="shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id = "phone" type = "number" placeholder = "Enter Phone Number" />  
            </div>


        <div className = "flex items-center justify-center login-btn-container">
            <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Submit</button>
        </div>

   </form>

</div>

    </>

  )
}

export default ShippingDetails