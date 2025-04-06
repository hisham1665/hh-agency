import mongoose from "mongoose";

const CatagorySchema = new mongoose.Schema({
    Catagory_name : {
        type : String,
        required : true
    },
    Catagory_Image : {
        type : String,
        required : false
    },
}, {
    timestamps:true
});

const Catagory = mongoose.model('Catagory' , CatagorySchema);
export default Catagory;