import React from 'react';
import '../display_image/style.css';
import { IoCloseOutline } from "react-icons/io5";

const DisplayImage = ({
    imgUrl,
    onClose
}) => {
  return (
    <div className='displayImgWrapper'>
  
        <div className='displayImg'>
      
            <img src={imgUrl}/>
            <IoCloseOutline onClick={onClose}/>
        </div>
    </div>

  )
}

export default DisplayImage