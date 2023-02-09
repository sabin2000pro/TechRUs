import React from 'react'

// Pre Conditions: 1. The modal is closed before clicking the button to open it AND the modal is NOT already open
// Post Conditions: 1. Modal is open when the toggle modal function is invoked AND the is modal open flag is set to true

export interface IModalProps { // Props for the modal (opening and closing the modal)
    closeModal: () => void
    toggleModal: () => void
    isModalOpen: boolean | null
}

export const Modal: React.FC<IModalProps> = ({closeModal, toggleModal, isModalOpen}) => { // Modal component

  return (

    <>

     <div>
        <button onClick = {toggleModal}>View Details</button>
     </div>

    </>


  )
}