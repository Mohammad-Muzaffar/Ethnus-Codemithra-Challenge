import mongoose from 'mongoose';

const transactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  dateOfSale: { type: Date, required: true },
  sold: { type: Boolean, required: true },
  category: { type: String, required: true }  // Add category field
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;
