import React, { useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux';
import MetaData from '../../layout/MetaData';

interface IEditShiftDatesProps {
    startShiftDate: Date;
    endShiftDate: Date
}

const EditUserShiftDates: React.FC<IEditShiftDatesProps> = () => { // Component that allows the store manager to edit the staff users start / end shift dates
    const [startShiftDate, setStarShiftDate] = useState(Date.now());
    const [endShiftDate, setEndShiftDate] = useState(Date.now());
    const dispatch = useDispatch();
    const {loading, error, user} = useSelector((state: any) => state.user) as any;

    const handleEditUserShift = (event) => {
      event.preventDefault();
    }

  return (

    <>
       <MetaData pageTitle = {`Edit Staff User Shifts`} />

        
    </>


  )
}

export default EditUserShiftDates