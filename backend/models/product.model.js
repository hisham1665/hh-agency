import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    Product_name : {
        type : String,
        required : true
    },
    Product_price : {
        type : Number,
        required : true
    },
    Wholesale_price : {
        type : Number,
        required : true
    },
    Product_Catogory : {
        type : String,
        required : true
    }
}, {
    timestamps:true
});

const Product = mongoose.model('Products' , ProductSchema);
export default Product;