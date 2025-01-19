import { NextResponse } from 'next/server';
import { connectDB } from '@/app/lib/db';
import { Product } from '@/app/models/Product';

export async function GET() {
  try {
    await connectDB();
    const products = await Product.find();
    return NextResponse.json(products);
  } catch (error) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    await connectDB();
    const body = await request.json();
    const { name, price, image, quantity } = body;

    if (!name || price === undefined || quantity === undefined) {
      return NextResponse.json({ error: "Name, price, and quantity are required." }, { status: 400 });
    }

    const newProduct = new Product({ 
      name, 
      price: parseFloat(price), 
      image, 
      quantity: parseInt(quantity) 
    });
    await newProduct.save();

    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create product" }, { status: 500 });
  }
}