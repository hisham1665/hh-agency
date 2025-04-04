import React from "react"
import Home from "./pages/home"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Billing from "./pages/Billing-page";
import Product from "./pages/Product-page";
import Login from "./pages/Login-page";
import Not from "./pages/Not-Found";
import SignUpPage from "./pages/Signup-Page";
function App() {
  return (
   <Router>
    <NavBar />
    <div className="mt-16">

    <Routes  > 
      
      <Route path="/" element={<Home/>} />
      <Route path="/Billing" element={<Billing/>} />
      <Route path="/Product" element={<Product/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/sign-up" element={<SignUpPage/>} />
      <Route path="*" element={<Not/>} />
    </Routes>
    </div>
   </Router>
  )
}

export default App
