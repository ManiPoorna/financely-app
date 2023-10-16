import React, { useState } from 'react'
import "./style.css"
import Input from '../Input/Input.js'
import Button from '../Button/Button.js'
import { ToastContainer, toast } from 'react-toastify'
import { useNavigate, NavLink } from "react-router-dom";
import { auth, provider, doc, setDoc, db} from "../../firebase.js"
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { getDoc } from 'firebase/firestore'
import Loader from '../Loader/Loader'


const LoginPage = () => {

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loader, setloader] = useState(false);
  const navigate = useNavigate();

  function loginWithEmail(e) {
    e.preventDefault();

    if (email === "" || password === "") { 
			toast.error("All fields are mandatory!")
    }
    else {
      setloader(true)
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in 
          const user = userCredential.user;
          toast.success("Login successfull ")
          setTimeout(() => {
            navigate("/financely-dashboard")
            setloader(false)
          }, 800)
          setEmail("")
          setPassword("")
          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorCode, errorMessage);
          setloader(false)
        });
    }
  }

  function loginWithGoogle(e) {
    setloader(true)
		e.preventDefault();
			signInWithPopup(auth, provider)
				.then((result) => {
					// This gives you a Google Access Token. You can use it to access the Google API.
					const credential = GoogleAuthProvider.credentialFromResult(result);
					const token = credential.accessToken;
					// console.log(token)
					// The signed-in user info.
					const user = result.user;
					console.log("User -> ", user)
          toast.success("Login Successful")
          createDoc(user)
					// Navigating to dashboard
					setTimeout(() => {
						// navigate("/financely-dashboard")
						setloader(false)
					}, 1500)
				})
				.catch((error) => {
					// Handle Errors here.
					const errorCode = error.code;
					const errorMessage = error.message;
					toast.error(errorCode, errorMessage);
				});
  }
  
  // function to Create document for User to store Email, userName, photoUrl, etc..
	async function createDoc(user) {
		// Add a new document in collection "cities"
		//checking if user exists or not
		if (!user) return;
		const useRef = doc(db, "Users", user.uid)
		const userData = await getDoc(useRef)

		if (!userData.exists()) {
			try {
				await setDoc(doc(db, "Users", user.uid), {
					name: user.displayName,
					email: user.email,
					photoURL: user.photoURL ? user.photoURL : "",
					createdAt: new Date(),
				});
				// toast.success("Doc created successfully")
			}
			catch (err) {
				toast.error(err.message)
			}
		}
		else {
			// toast.error("Doc already exists")
			console.log("Doc already exists")
		}
	}


  return (
    <div className='login-form'>
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
			{
				loader ? <Loader /> : ""
			}
	<div className="signup-form app-flex">
        <form className="form-control-login">
          <h2>Login to <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
          <Input label="Email" type="email" placeholder="Example@123" value={email} setValue={setEmail} />
          <Input label="Password" type="password" placeholder="**********" value={password} setValue={setPassword} />
          <Button onClick={loginWithEmail} text="Login" tyeOfLogin={false} loader={loader} />
          <p style={{ textAlign: "center" }}>Or</p>
          <Button onClick={loginWithGoogle} text="Login with Google" tyeOfLogin={true} loader={loader} />
					<p style={{ textAlign: "center", padding:"0.7rem 0px 0px 0px" }}>Don't have an Account? <NavLink to="/">Signup</NavLink></p>
        </form>
      </div>
    </div>
  )
}

export default LoginPage