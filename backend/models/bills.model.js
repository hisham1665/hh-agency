import mongoose from "mongoose";

const BillProductSchema = new mongoose.Schema({
    Product_Name : {
        type: String,
        required: true
    },
    Product_Catagory : {
        type: String,
        required: true
    },
    Product_Price : {
        type: Number,
        required: true
    },
    Product_QTY : {
        type: Number,
        required: true
    },
    Product_Total : {
        type: Number,
        required: true
    }
})

const BillSchema = new mongoose.Schema({
    Bill_ID : {
        type : Number,
        required : true,
        unique: true
    },
    Customer_name : {
        type: String,
        required: true
    },
    Sale_Man : {
        type: String,
        required: true
    },
    Customer_Number : {
        type: Number,
        required: true
    },
    Billing_Products : [BillProductSchema],
    Bill_Date : {
        type: Date,
        default : Date.now
    },
    Bill_Time : {
        type: String,
        default : "00:00:00"
    },
    Bill_Total : {
        type: Number,
        required: true
    },
    Discount : {
        type: Number,
        default : 0
    },
    Grand_total : {
        type: Number,
        required: true
    },
    isPaid : {
        type: Boolean,
        default : false
    },
    Paid_amount : {
        type : Number,
        required : false,
        default : 0
    },
    Amount_Given : {
        type : Number,
        default : 0,
    },
    Balance_Amount : {
        type : Number,
        default : 0
    },
    Payment_Method : {
        type : String,
        default : "Cash",
    }
})

const Bills = mongoose.model('Bills' , BillSchema);
export default Bills;