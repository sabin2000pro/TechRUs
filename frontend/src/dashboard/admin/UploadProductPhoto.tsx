import React, {useState} from 'react'
import { useDispatch , useSelector} from 'react-redux'

const UploadProductPhoto = () => {
  const [image, setImage] = useState<string>("");
  const dispatch = useDispatch();

  return (
    <>
      <h2 className = "heading-secondary">Upload Product Photo Page - Admin Dashboard</h2>
    </>


  )
}

export default UploadProductPhoto