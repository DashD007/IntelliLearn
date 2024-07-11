import React from 'react'
import image from "../assests/images/error.svg"
const Error = () => {
  return (
    <div className='w-full flex items-center justify-center'>
      <img src={image} alt="error-image" className='object-cover'/>
    </div>
  )
}

export default Error;