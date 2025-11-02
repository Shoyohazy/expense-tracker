import Transaction from "../models/transaction.js";

// Get all transactions (with filters)
export const getTransactions = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;
    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;
    if (startDate && endDate)
      filter.date = { $gte: new Date(startDate), $lte: new Date(endDate) };

    const transactions = await Transaction.find(filter).sort({ date: -1 });
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add a new transaction
export const addTransaction = async (req, res) => {
  try {
    const { type, amount, description, category, date } = req.body;

    if (!type || !amount || !category) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    const transaction = await Transaction.create({
      type,
      amount,
      description,
      category,
      date,
    });

    res.status(201).json(transaction);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a transaction
export const updateTransaction = async (req, res) => {
  try {
    const updated = await Transaction.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a transaction
export const deleteTransaction = async (req, res) => {
  try {
    const deleted = await Transaction.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Not found" });
    res.status(200).json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
