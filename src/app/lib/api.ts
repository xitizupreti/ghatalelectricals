import { Product } from "../models/Product"
import { connectDB } from "./db"


export async function getProducts() {
  await connectDB()
  const products = await Product.find()
  return JSON.parse(JSON.stringify(products))
}

export async function getCategories() {
  await connectDB()
  const categories = await Product.distinct("category")
  return categories
}

export async function getProductsByCategory(category: string) {
  await connectDB()
  const products = await Product.find({ category })
  return JSON.parse(JSON.stringify(products))
}

