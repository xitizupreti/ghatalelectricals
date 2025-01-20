import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  category: { type: String, required: true },
})

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
