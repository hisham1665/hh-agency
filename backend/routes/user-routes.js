import express from 'express';
import mongoose from 'mongoose';
import { createUser , login } from '../controllers/userControllers.js';

const Userroutes = express.Router()

Userroutes.post("/createuser" , createUser)

Userroutes.post("/login",login)


export default Userroutes;