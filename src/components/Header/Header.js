import React, { useEffect } from 'react'
import "./style.css"
import { auth } from '../../firebase.js';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

const Header = () => {
  
  const [user, loading] = useAuthState(auth);
  // console.log(user)
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/financely-dashboard")
    }
    else {
      navigate("/financely-app")
    }
  },[user,loading,navigate])

  function logout() {
    try {
      signOut(auth).then(() => {
        // Sign-out successful.
        toast.success("Logged out Successfully!")
        setTimeout(() => {
          navigate("/login");
        })
      }).catch((error) => {
        // An error happened.
        toast.error(error.message)
      });
    }
    catch (error) { 
      toast.error(error.message)
    }
  }


  return (
    <div className='header-container'>
      <ToastContainer
				position="top-right"
				autoClose={2000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss
				draggable
				pauseOnHover
				theme="light"
      /> 
      <div className='header header-flex'>
        <p className='heading'>Financely.</p>
        {
          user && <div className='image-logout'>
            {
              user.photoURL ? <img src={user.photoURL} alt="logo" />
              : <img src="https://static-00.iconduck.com/assets.00/user-icon-2048x2048-ihoxz4vq.png" alt="logo"/>
            }
            <p onClick={logout} className='logout'>Logout</p>    
          </div>
          }
      </div>
        
    </div>
  )
}

export default Header