import express from 'express';
import mongoose from 'mongoose';
import { createBill } from '../controllers/billController.js';

const BillRoutes = express.Router();

BillRoutes.post("/create-bill", createBill);

export default BillRoutes;