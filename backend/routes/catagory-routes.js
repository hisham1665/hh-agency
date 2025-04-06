import express from 'express';
import mongoose from 'mongoose';
import { createCatagory, getCatagory } from '../controllers/catagoryController.js';



const Catagoryroutes = express.Router()

Catagoryroutes.post("/createCatagory" , createCatagory )
Catagoryroutes.get("/get-catagory", getCatagory)


export default Catagoryroutes;