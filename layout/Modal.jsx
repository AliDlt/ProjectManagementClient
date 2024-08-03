import React from 'react'

const Modal = ({children}) => {
  return (
    <div className='fixed top-0 left-0 w-full h-full z-50 flex justify-center items-center bg-black bg-opacity-20 '>
        {children}
    </div>
  )
}

export default Modal