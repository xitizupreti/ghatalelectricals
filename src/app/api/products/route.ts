import { NextResponse } from "next/server"
import { Product } from "@/app/models/Product"
import { connectDB } from "@/app/lib/db"

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const { name, price, image, quantity, category } = body

    if (!name || price === undefined || quantity === undefined) {
      return NextResponse.json({ error: "Name, price, and quantity are required." }, { status: 400 })
    }

    const productData: { name: String; price: number; image: String; quantity: number; category?: string } = {
      name,
      price: Number.parseFloat(price),
      image,
      quantity: Number.parseInt(quantity),
    }

    if (category) {
      productData.category = category
    }

    const newProduct = new Product(productData)
    await newProduct.save()

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    console.error("POST Error:", error)
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 })
  }
}

export async function GET(request: Request) {
  try {
    await connectDB()
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")

    let query = {}
    if (category) {
      query = { category }
    }

    const products = await Product.find(query)
    return NextResponse.json(products)
  } catch (error) {
    console.error("GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}