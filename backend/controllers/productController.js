import Product from "../models/product.model.js"

export const createProduct = async (req , res) => {
    const product = req.body;
    if(!product.Product_name || !product.Product_price ||!product.Product_Catogory ){
        return res.status(400).json({message : "Please fill all the fields" })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save()
        res.status(201).json({ success: true, message: "Product created successfully" })

    }catch (err){
        res.status(500).json({ success: false, message: "Error creating product" })
    }
}