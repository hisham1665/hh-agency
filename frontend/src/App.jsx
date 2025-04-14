import React from "react";
import Home from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NavBar from "./components/NavBar";
import Billing from "./pages/Billing-page";
import Product from "./pages/Product-page";
import Login from "./pages/Login-page";
import Not from "./pages/Not-Found";
import SignUpPage from "./pages/Signup-Page";
import InventoryPage from "./pages/InventoryPage";
import ProtectedRoute from "./components/ProtectedRoutes";
import CategoryProductsPage from "./pages/CatagoryProductPage";
import { useColorModeValue } from "@chakra-ui/react";
import Footer from "./components/Footer";

function App() {
  const bgColour = useColorModeValue(
    "linear-gradient(to bottom, #F7FAFC, #CBD5E0)", // light mode
    "linear-gradient(to bottom, #2D3748, 	#171923)"  // dark mode
  );
  const bgColorFooter = useColorModeValue("linear-gradient(to bottom,  #CBD5E0 , #6B7280)" , "linear-gradient(to bottom, #171923, 	#0F0F0F)");
  return (
    <Router>
      <NavBar />
      <div className="mt-16 magicpattern" style={{ background: bgColour, minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Product" element={<Product />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/sign-up" element={<SignUpPage />} />
          <Route path="*" element={<Not />} />
          <Route path="/not-found" element={<Not />} />
          <Route path="/Inventory" element={<ProtectedRoute allowedRoles={["admin"]}><InventoryPage /></ProtectedRoute>} />
          <Route path="/category/:categoryName" element={<CategoryProductsPage />} />
          <Route path="/billing" element={<ProtectedRoute allowedRoles={["admin"]}><Billing /></ProtectedRoute>} />
        </Routes>
      </div>
      <div className=" p-5 " style={{background: bgColorFooter}} >
        <Footer />
      </div>
    </Router>
  );
}

export default App;
