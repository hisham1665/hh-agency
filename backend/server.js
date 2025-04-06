import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Connectdb } from './config/db.js';

import cors from 'cors';
import Userroutes from './routes/user-routes.js';
import Productroutes from './routes/product-routes.js';
import Catagoryroutes from './routes/catagory-routes.js';
dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Your React app URL
    credentials: true,                // If you plan to use cookies or authentication
  }));
  
app.use(express.json())

app.get("/", (req , res ) => {
    res.send("server is ready")
})
app.use("/api/user/", Userroutes)
app.use("/api/product/",Productroutes )
app.use("/api/catagory/",Catagoryroutes )

app.listen(5000, ()=> {
    Connectdb()
    console.log("server run at http://localhost:5000")
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to:', mongoose.connection.name);
      });
      
})