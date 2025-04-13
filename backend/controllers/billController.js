import Bills from "../models/bills.model.js";

const generateRandomBillID = () => {
    const randomNum = Math.floor(Math.random() * 10000);  // Random number between 0 and 9999
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');  // Ensures two digits for day
    const month = String(date.getMonth() + 1).padStart(2, '0');  // Ensures two digits for month
    const year = String(date.getFullYear()).slice(-2);  // Last two digits of the year
    
    return `${randomNum}${day}${month}${year}`;  // Format: XXXXDDMMYY
  };

export const createBill = async (req , res) => {
    const Bill = req.body;
    if(!Bill.Customer_name || !Bill.Bill_Total || !Bill.Billing_Products || !Bill.Paid_amount){
        return res.status(400).json({message : "Please fill all the fields" })
    }
    Bill.Bill_ID = generateRandomBillID();
    const newBill = new Bills(Bill);
    try {
        await newBill.save()
        res.status(201).json({ success: true, message: "Catagory created successfully" })

    }catch (err){
        res.status(500).json({
            success: false,
            message: "Error creating Bill",
            error: err.message || 'Unknown error occurred',
          });
    }
}
