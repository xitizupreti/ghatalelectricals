import { NextResponse } from "next/server"
import { Product } from "@/app/models/Product"
import { connectDB } from "@/app/lib/db"
import { revalidatePath } from "next/cache"

export async function POST(request: Request) {
  try {
    await connectDB()
    const body = await request.json()
    const { name, price, image, quantity, category } = body

    if (!name || price === undefined || quantity === undefined) {
      return NextResponse.json({ error: "Name, price, and quantity are required." }, { status: 400 })
    }

    const productData: { name: string; price: number; image: string; quantity: number; category?: string } = {
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

    revalidatePath("/products")
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
    const search = searchParams.get("search")

    const query: { category?: string; name?: { $regex: string; $options: string } } = {}
    if (category) {
      query.category = category
    }
    if (search) {
      query.name = { $regex: search, $options: "i" }
    }

    const products = await Product.find(query)

    // Set cache control headers to prevent caching
    return new NextResponse(JSON.stringify(products), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    console.error("GET Error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}