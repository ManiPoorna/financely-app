import React from "react";
import "./index.css";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header.js";
import SignUp from "./components/SignupSignin/Signup.js";
import LoginPage from "./components/LoginPage/LoginPage.js";
import Dashboard from "./components/Dashboard/Dashboard.js";
import NoPageFound from "./components/NopageFound/NoPageFound";

function App() {

  return (
    <div className="app">
      <Header />
      <Routes>
        <Route path="/" element={<SignUp />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/financely-app" element={<SignUp />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/financely-dashboard" element={<Dashboard />} />
        <Route path="*" element={<NoPageFound />} />
      </Routes>
    </div>
  );
}

export default App;
