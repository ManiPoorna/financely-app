import React from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import { auth } from '../../firebase'
import Button from "../Button/Button.js"
import { useNavigate } from 'react-router-dom'
import "./style.css";

const NoPageFound = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  
  function goBack() {
    if (user) {
     navigate("/financely-dashnoard") 
    }
    else {
      navigate("/financely-app");
    }
  }


  return (
    <div className='no-page'>
      <h1>Oops..! No Page Found</h1>
      <Button onClick={goBack} text={"Go Back"}></Button>
    </div>
  )
}

export default NoPageFound