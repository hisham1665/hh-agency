import Catagory from "../models/catagory.model.js";


export const createCatagory = async (req , res) => {
    const catagory = req.body;
    if(!catagory.Catagory_name ){
        return res.status(400).json({message : "Please fill all the fields" })
    }

    const newCatagory = new Catagory(catagory);

    try {
        await newCatagory.save()
        res.status(201).json({ success: true, message: "Catagory created successfully" })

    }catch (err){
        res.status(500).json({ success: false, message: "Error creating Catagory" })
    }
}

export const getCatagory = async (req , res) => {
    if(!req.query.q) {

        try {
            const catagory = await Catagory.find();
            res.json(catagory);
        }catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    } else {
        try {
            const query = req.query.q;
            const catagory = await Catagory.find({
                Catagory_name: { $regex: query, $options: 'i' },
             });
            res.json(catagory);
        } catch (err) {
            res.status(500).json({ message: "Server error", error: err });
        }
    }
}