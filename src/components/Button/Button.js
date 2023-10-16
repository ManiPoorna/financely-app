import React from 'react'
import "./button-style.css";

const Button = ({tyeOfLogin, text, loader, onClick }) => {
  return (
    <div className='button-wrapper'>
          <button  className={tyeOfLogin? "blue" : "normal"} onClick={onClick}>{loader? "Loading..." : text}</button>
    </div>
  )
}

export default Button