import express from 'express';
import mongoose from 'mongoose';
import { createProduct, deleteProduct, getProducts, updateProduct } from '../controllers/productController.js';


const Productroutes = express.Router()

Productroutes.post("/createProduct" , createProduct)
Productroutes.get("/get-products", getProducts)
Productroutes.delete("/delete-product/:id", deleteProduct)
Productroutes.put("/update-product/:id", updateProduct)


export default Productroutes;