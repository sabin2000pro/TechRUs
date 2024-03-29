import React, { useState } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MetaData from '../../layout/MetaData';
import { updateUserShifts } from '../../actions/auth-actions';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";

const EditUserShiftDates: React.FC = () => { // Component that allows the store manager to edit the staff users start / end shift dates
    const [startShiftDate, setStartShiftDate] = useState<Date>(new Date(Date.now()));
    const [endShiftDate, setEndShiftDate] = useState<Date>(new Date(Date.now()));
    const [isValidDate, setIsValidDate] = useState<boolean>(false);
    const [shiftsUpdated, setShiftsUpdated] = useState<boolean>(false);

    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state: any) => state.singleUser) as any;

    const handleEditUserShift = (event: any): void => {
    
      try {

         event.preventDefault();

         if(isNaN(startShiftDate.getDate())) {
            setIsValidDate(false);
         }  

         if(isNaN(endShiftDate.getDate())) {
           setIsValidDate(false);
         }

         if(new Date(startShiftDate) > new Date(endShiftDate)) {
            alert("Start date cannot be later than the end date")
            setIsValidDate(false);
         }

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

    {isValidDate && (

      <>
        <div className="bg-red-200 border border-red-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
              <h2>Invalid Date</h2>
         </div>
      </>

    )}

     {error && (

      <>  

        <div className="bg-red-200 border border-red-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
              <h2>{error}</h2>
         </div>

      </>



     )}

       <MetaData pageTitle = {`Edit Staff User Shifts`} />

       {shiftsUpdated && (

        <>

         <div className="bg-green-200 border border-green-400 text-white-700 px-4 py-3 rounded my-4 success-banner">
            <h2>Shifts Updated</h2>
         </div>

        </>


       )}

        <>

        <div className = "flex justify-center items-center h-screen login-container">

            <form method = "PUT" onSubmit = {handleEditUserShift} className = "bg-white shadow-md rounded px-10 pt-8 pb-8 mb-4 auth-container form">

              <h2 className = "heading-secondary mb-4">Edit Shifts</h2>

            <div className = "mb-4 login-container-inputs">
                <label className = " block text-sm font-bold mb-2 login-username-label" htmlFor = "email">Start Shift</label>
                <DatePicker timeIntervals = {15} dateFormat = "yyyy/MM/dd HH:mm:ss" showTimeSelect value = {startShiftDate as any} className = "mb-9 date-picker" selected = {startShiftDate} onChange = {(date: Date) => setStartShiftDate(date)} />
              </div>

              <div className = "mb-6 login-password-container mt-5">
                  <label className = "block text-sm font-bold mb-2 mt-5 login-password-label" htmlFor = "password">End Shift</label>
                  <DatePicker timeIntervals={15} dateFormat="yyyy/MM/dd HH:mm:ss" showTimeSelect className = "date-picker" value = {endShiftDate as any} selected = {endShiftDate} onChange = {(date: Date) => setEndShiftDate(date)} />
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