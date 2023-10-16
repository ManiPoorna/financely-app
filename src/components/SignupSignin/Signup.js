import React, { useState } from "react";
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from "../../firebase.js";
import { getDoc } from "firebase/firestore";
import { doc, setDoc } from "firebase/firestore"; 
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Input from "../Input/Input.js";
import Button from "../Button/Button.js";
import Loader from "../Loader/Loader.js";



function SignUp() {
	const [name, setName] = useState("")
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [confirmPassword, setConfirmPassword] = useState("")
	const [loader, setloader] = useState(false);
	const [login, setLogin] = useState(false)
	const navigate = useNavigate();

	// Signup Handling with Email 
	function signUpWithEmail(e) {
		// prevents default behaviour of the form
		e.preventDefault();
		// checking all inputs
		if (email === "" || name === "" || password === "" || confirmPassword === "") {
			toast.error("All fields are mandatory!")
			return;
		}
		if (password !== confirmPassword) {
			toast.error("Password not Matched")
			setPassword("")
			setConfirmPassword("")
			return;
		}
		else {
			setloader(true)
			// creating a user
			createUserWithEmailAndPassword(auth, email, password)
			.then((userCredential) => {
				// Signed up 
				const user = userCredential.user;

				//function to create user Doc
				createDoc(user);

				//Notification Message
				toast.success("SignUp Successful")
				setTimeout(() => {
					navigate("/financely-dashboard")
					setloader(false)
					setLogin(true)
				},800)
				// emptying the inputs
				setName("")
				setEmail("")
				setPassword("")
				setConfirmPassword("")
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error(errorCode, errorMessage);
				setName("")
				setEmail("")
				setPassword("")
				setConfirmPassword("")
				setloader(false)
				setLogin(false)
				// ..
			});
		}
	}

	function signUpWithGoogle(e) {
		e.preventDefault();
		signInWithPopup(auth, provider)
			.then((result) => {
				// This gives you a Google Access Token. You can use it to access the Google API.
				const credential = GoogleAuthProvider.credentialFromResult(result);
				const token = credential.accessToken;
				// The signed-in user info.
				const user = result.user;
				console.log("User -> ", user)
				createDoc(user)
				toast.success("Account Created")
				// Navigating to dashboard
				setTimeout(() => {
					navigate("/financely-dashboard")
					setloader(false)
					setLogin(true)
				}, 1500)
			})
			.catch((error) => {
				// Handle Errors here.
				const errorCode = error.code;
				const errorMessage = error.message;
				toast.error(errorCode, errorMessage);
				setLogin(false);
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
					name: user.name ? user.name.trim() : name.trim(),
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
		<div className="app">
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
						loader ? <Loader/> : ""
					}
			<div className="signup-form app-flex">
				<form className="form-control">
					<h2>SignUp on <span style={{ color: "var(--theme)" }}>Financely.</span></h2>
					<Input label="Full Name" type="text" placeholder="Full Name" value={name} setValue={setName} />
					<Input label="Email" type="email" placeholder="Example@123" value={email} setValue={setEmail} />
					<Input label="Password" type="password" placeholder="**********" value={password} setValue={setPassword} />
					<Input label="Confirm Password" type="password" placeholder="**********" value={confirmPassword} setValue={setConfirmPassword} />
					<Button onClick={signUpWithEmail} text="SignUp" tyeOfLogin={false} loader={loader} />
					<p style={{ textAlign: "center" }}>Or</p>
					<Button onClick={signUpWithGoogle} text="SignUp with Google" tyeOfLogin={true} loader={loader} />
					<p style={{ textAlign: "center",padding:"0.5rem 0px 0px 0px" }}>Already an user? <NavLink to="/login">LogIn</NavLink></p>
				</form>
			</div>
		</div>
	);
}

export default SignUp;
