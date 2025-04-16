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
    if(!Bill.Customer_name || !Bill.Bill_Total || !Bill.Billing_Products ){
        return res.status(400).json({message : "Please fill all the fields" })
    }
    Bill.Bill_ID = generateRandomBillID();
    const newBill = new Bills(Bill);
    try {
        await newBill.save()
        res.status(201).json({ success: true, message: "Catagory created successfully", bill_id : newBill.Bill_ID })

    }catch (err){
        res.status(500).json({
            success: false,
            message: "Error creating Bill",
            error: err.message || 'Unknown error occurred',
            bill_id : "N\A"
          });
    }
}

export const allBills = async (req, res) => {
    try {
        const bills = await Bills.find();
        res.json(bills);
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}
export const paidBills = async (req, res) => {
    try {
        const bills = await Bills.find({isPaid : true});
        res.json(bills);
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}
export const unpaidBills = async (req, res) => {
    try {
        const bills = await Bills.find({isPaid : false});
        res.json(bills);
    }catch (err) {
        res.status(500).json({ message: "Server error", error: err });
    }
}

export const getBill = async (req, res) => {
    const query = req.query.q;
    if(query == "N\A") {
        res.status(404).json({
            message : "Bill not found",
            bill_id : "N\A"
        })
    }else{
        try {
            const bill = await Bills.findOne({Bill_ID : query});
            res.json(bill)
        } catch(err) {
            res.status(404).json({ message: "Bill not found", error: err });
        }
    }
}

export const updateBalance = async (req, res) => {
    const billId = req.params.id;
  const { Balance_Amount, isPaid } = req.body;

  if (Balance_Amount == null || isPaid == null) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const updatedBill = await Bills.findOneAndUpdate(
      { Bill_ID: billId },
      { Balance_Amount, isPaid },
      { new: true }
    );

    if (!updatedBill) {
      return res.status(404).json({ error: 'Bill not found' });
    }

    res.json(updatedBill);
  } catch (error) {
    console.error('Error updating bill:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
}