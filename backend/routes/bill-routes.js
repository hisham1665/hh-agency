import express from 'express';
import mongoose from 'mongoose';
import { allBills, createBill, getBill, paidBills, unpaidBills ,updateBalance } from '../controllers/billController.js';

const BillRoutes = express.Router();

BillRoutes.post("/create-bill", createBill);
BillRoutes.get("/allBills" , allBills);
BillRoutes.get("/search-bill" , getBill);
BillRoutes.get("/paidBills" , paidBills);
BillRoutes.get("/unpaidBills" , unpaidBills);
BillRoutes.put("/updateBalance/:id" , updateBalance);

export default BillRoutes;