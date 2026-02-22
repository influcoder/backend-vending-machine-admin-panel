import Customer from "../models/Customer.js";

//  Get all customers
export const getAllCustomers = async (req, res) => {
  try {
    const customers = await Customer.find().sort({ lastOrderAt: -1 });
    res.json({ success: true, customers });
  } catch (err) {
    console.error("Fetch customers error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get customer by phone
export const getCustomerByPhone = async (req, res) => {
  try {
    const { phone } = req.params;

    const customer = await Customer.findOne({ phone });

    if (!customer)
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });

    res.json({ success: true, customer });
  } catch (err) {
    console.error("Fetch customer error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
