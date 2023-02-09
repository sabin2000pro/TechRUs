import React from 'react'

export interface IModalProps { // Props for the modal (opening and closing the modal)
    closeModal: () => void
    openModal: () => void
    isModalOpen: boolean | null
}

export const Modal: React.FC<IModalProps> = ({closeModal, openModal, isModalOpen}) => {

  return (
    
    <>

    </>


  )
}