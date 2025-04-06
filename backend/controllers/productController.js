import Product from "../models/product.model.js"

export const createProduct = async (req , res) => {
    const product = req.body;
    if(!product.Product_name || !product.Product_price ||!product.Product_Catogory || !product.Wholesale_price ){
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

export const getProducts = async (req, res) => {
  const query = req.query.q;

  try {
    if (!query) {
      const products = await Product.find();
      return res.json(products);
    }

    const results = await Product.aggregate([
      {
        $search: {
          index: 'default', // Name of the index created in Step 1
          text: {
            query: query,
            path: 'Product_name',
            fuzzy: {
              maxEdits: 2,   // Allows up to 2 typos (insert, delete, replace)
              prefixLength: 1, // Require at least 1 correct starting character
            },
          },
        },
      },
    ]);

    res.json(results);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err });
  }
};


export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    console.log(id)
    if (!id) {
      return res.status(400).json({ message: "Please provide product id" });
    }
  
    try {
      const product = await Product.findById(id);
  
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      await product.deleteOne();
  
      res.status(200).json({ message: "Product deleted successfully" });
    } catch (err) {
      console.error("Delete product error:", err);
      res.status(500).json({ message: "Server error", error: err.message });
    }
  };


export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { Product_name, Product_price , Wholesale_price , Product_Catogory } = req.body;
  
    if (!Product_name || !Product_price || !Product_Catogory || !Wholesale_price) {
      return res.status(400).json({ message: "All fields are required" });
    }
  
    try {
      const updatedProduct = await Product.findByIdAndUpdate(
        id,
        {
          Product_name,
          Product_price,
          Wholesale_price,
          Product_Catogory,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" });
      }
  
      res.json({
        message: "Product updated successfully",
        product: updatedProduct,
      });
    } catch (err) {
      console.error("Error updating product:", err);
      res.status(500).json({ message: "Server error", error: err });
    }
  };
  