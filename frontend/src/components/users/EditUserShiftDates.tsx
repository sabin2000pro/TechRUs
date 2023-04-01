import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MetaData from '../../layout/MetaData';
import { updateUserShifts } from '../../actions/auth-actions';
import Loader from '../../layout/Loader';
import DatePicker from 'react-datepicker';
import { useParams } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";

interface IEditShiftDatesProps {
    startShiftDate: Date;
    endShiftDate: Date
}

const EditUserShiftDates: React.FC<IEditShiftDatesProps> = () => { // Component that allows the store manager to edit the staff users start / end shift dates
    const [startShiftDate, setStartShiftDate] = useState<Date>(new Date(Date.now()));
    const [endShiftDate, setEndShiftDate] = useState<Date>(new Date(Date.now()));
    const [shiftsUpdated, setShiftsUpdated] = useState<boolean>(false);
    const dispatch = useDispatch();

    const {loading, error, user} = useSelector((state: any) => state.singleUser) as any;

    const handleEditUserShift = (event: any): void => {
    

      try {
         event.preventDefault();

         dispatch(updateUserShifts(user._id, startShiftDate, endShiftDate as any) as any);
         setShiftsUpdated((shiftsUpdated) => !shiftsUpdated)
      }
      
      catch(error) {

         if(error) {
             setShiftsUpdated(false);
         }

      }


    }

  return (

    <>

     {error && (

      <>  
       
      </>
     )}

       <MetaData pageTitle = {`Edit Staff User Shifts`} />

       {loading && <Loader />}

        <>
        <div className = "flex justify-center items-center h-screen login-container">

            <form method = "PUT" onSubmit = {handleEditUserShift} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container form">

              <h1 className = "heading-primary h-login">Edit Shifts</h1>

            <div className = "mb-4 login-container-inputs">
                <label className ="block text-sm font-bold mb-2 login-username-label" htmlFor = "email">Start Shift Date</label>
                <DatePicker selected = {startShiftDate} onChange = {(event) => setStartShiftDate(event.target.value)} />
              </div>

              <div className = "mb-6 login-password-container mt-5">
                  <label className = "block text-sm font-bold mb-2 mt-5 login-password-label" htmlFor = "password">End Shift Date</label>
                  <DatePicker selected = {endShiftDate} onChange = {(event) => setEndShiftDate(event.target.value)} />
              </div>

              <div className = "flex items-center justify-center login-btn-container">

              <button className = "text-white font-bold py-2 px-4 rounded flex justify-center focus:outline-none focus:shadow-outline" type="submit">Submit</button>

              </div>

            </form>

            </div>
   
        </>


        
    </>


  )
}

export default EditUserShiftDates