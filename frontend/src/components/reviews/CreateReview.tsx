import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createReview } from '../../actions/review-actions';

interface ICreateReviewProps {
  product: any
  showReviewModal: boolean;
}

const CreateReview: React.FC<ICreateReviewProps> = ({product, showReviewModal}: ICreateReviewProps) => {
  const dispatch = useDispatch();

  const [title, setTitle] = useState<string>("");
  const [rating, setRating] = useState<number>(0);
  const [comment, setComment] = useState<string>("");
  const [reviewSubmitted, setReviewSubmitted] = useState<boolean>(false);
  const [modalClosed, setModalClosed] = useState<boolean>(false);

  const handleCreateReview = (event): void => {
    try {
       event.preventDefault();

       console.log(`The product creating review for : `, product);

       dispatch(createReview(product._id, title, rating, comment) as any);

       setReviewSubmitted((reviewSubmitted) => !reviewSubmitted);
    } 
    
    catch(error) {

       if(error) {
        console.error(error);

        setReviewSubmitted(false);
       }
    }


  }

  return (


<>

      {showReviewModal && (

        <div className = "fixed z-10 inset-0 overflow-y-auto">

          <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">


            {!modalClosed && (

              <>
              
                  <div className = "fixed inset-0 transition-opacity">
                       <div className="absolute inset-0 bg-black opacity-70"></div>
                   </div>

              </>

            )}

            <span className = "hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
              &#8203;
            </span>

            <div className = "inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" aria-modal="true" aria-labelledby="modal-headline">

              <form method = "POST" onSubmit = {handleCreateReview}>

                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">

                  <div className = "mb-4">

                    <h2 className = "heading-secondary mb-5">Review Product - {product.name} </h2>

        <label className="block text-gray-700 font-bold mb-2 review-label" htmlFor = "title">Title</label>

            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "title" type = "text" placeholder = "Review Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                  </div>


                 <div className="mb-4">    
                    <label className="block text-gray-700 font-bold mb-2" htmlFor = {comment}>Comment</label>
                    <textarea className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id = "comment" placeholder = "Review Comment" value={comment} onChange={(e) => setComment(e.target.value)} />
                  </div>


            <div className="mb-4">

              <label className="block text-gray-700 font-bold mb-2" htmlFor="rating">Rating</label>

              <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="rating" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}>

                  <option value={0}>Select a rating</option>
                  <option value={1}>1</option>
                  <option value={2}>2</option>
                  <option value={3}>3</option>
                  <option value={4}>4</option>
                      <option value={5}>5</option>
                </select>
              </div>
            </div>


            <div className = "px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse review-container">
                <button className = "px-2 rounded bask-btn">Submit Rating</button>
            </div>

          </form>

        </div>
      </div>
    </div>
  )}
</>


  )
}

export default CreateReview