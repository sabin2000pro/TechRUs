import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

interface IHandleCreateReviewProps {
  handleCreateReview: () => void,
  showReviewModal: boolean;
}

const CreateReview: React.FC<IHandleCreateReviewProps> = ({handleCreateReview, showReviewModal}: IHandleCreateReviewProps) => {
  const dispatch = useDispatch();

  return (

    <>
      <button className = "px-2 rounded basket-btn" onClick = {handleCreateReview}>Create Review</button>
    </>

  )
}

export default CreateReview