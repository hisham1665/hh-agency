import express from 'express';
import mongoose from 'mongoose';
import { createUser , login } from '../controllers/userControllers.js';

const routes = express.Router()

routes.post("/createuser" , createUser)

routes.post("/login",login)


export default routes;