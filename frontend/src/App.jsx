import React from "react"
import Home from "./pages/home"
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import NavBar from "./components/NavBar";
import Billing from "./pages/Billing-page";
import Product from "./pages/Product-page";
import Login from "./pages/Login-page";
import Not from "./pages/Not-Found";
import SignUpPage from "./pages/Signup-Page";
import InventoryPage from "./pages/InventoryPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import CategoryProductsPage from "./pages/CatagoryProductPage";

function App() {
  return (
   <Router>
    <NavBar />
    <div className="mt-16">

    <Routes  > 
      <Route path="/" element={<Home/>} />
      <Route path="/Product" element={<Product/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/sign-up" element={<SignUpPage/>} />
      <Route path="*" element={<Not/>} />
      <Route path="/not-found" element={<Not/>} />
      <Route path="/Inventory" element={<ProtectedRoute allowedRoles={["admin"]} > <InventoryPage/> </ProtectedRoute>} />
      <Route path="/category/:categoryName" element={<CategoryProductsPage/>} />
      <Route path="/billing" element={<ProtectedRoute allowedRoles={["admin"]} > <Billing /> </ProtectedRoute>} />
    </Routes>
    </div>
    <div className="mt-10 p-5 bg-slate-800">
      <span className="text-white ">devoloper : Hisham</span>
    </div>
   </Router>
  )
}

export default App
