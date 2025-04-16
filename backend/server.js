import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { Connectdb } from './config/db.js';
import path from 'path';
import cors from 'cors';
import Userroutes from './routes/user-routes.js';
import Productroutes from './routes/product-routes.js';
import Catagoryroutes from './routes/catagory-routes.js';
import BillRoutes from './routes/bill-routes.js';
dotenv.config()
const app = express();

app.use(cors({
    origin: "http://localhost:5173",  // Your React app URL
    credentials: true,                // If you plan to use cookies or authentication
  }));
const __dirname = path.resolve();
app.use(express.json())

/*app.get("/", (req , res ) => {
    res.send("server is ready")
})*/
app.use("/api/user/", Userroutes)
app.use("/api/product/",Productroutes )
app.use("/api/catagory/",Catagoryroutes )
app.use("/api/bills/",BillRoutes )

if(process.env.NODE_ENV === "production"){
  app.use(express.static(path.join(__dirname, "frontend/dist")))
  console.log("Running in production. Serving frontend...");
  app.get("*" , (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist" , "index.html"))
  })
}

app.listen(5000, ()=> {
    Connectdb()
    console.log("server run at http://localhost:5000")
    mongoose.connection.on('connected', () => {
        console.log('Mongoose connected to:', mongoose.connection.name);
      });
      
})