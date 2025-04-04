import express from 'express';
import mongoose from 'mongoose';
import { createProduct } from '../controllers/productController.js';


const Productroutes = express.Router()

Productroutes.post("/createProduct" , createProduct)


export default Productroutes;