import React from 'react'
import "./style.css";

const Input = ({label, type, placeholder, value, setValue}) => {
  return (
    <div className='input-wrapper'>
      <div className='label-box'>
        <label className='label'>{label}</label>
      </div>
      <div className='input-box'>
        <input className='input' type={type} placeholder={placeholder} onChange={(e)=>setValue(e.target.value)} value={value} />
      </div>
    </div>
  )
}

export default Input