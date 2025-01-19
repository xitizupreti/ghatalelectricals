import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // Store image as Base64 or Buffer
  quantity: { type: Number, required: true },
});

export const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);
