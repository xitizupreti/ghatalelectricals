import { NextResponse } from "next/server"
import { connectDB } from "@/app/lib/db"
import mongoose from "mongoose"
import { GridFSBucket } from "mongodb"

export async function POST(request: Request) {
  try {
    await connectDB()
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection is not established");
    }
    const bucket = new GridFSBucket(db, { bucketName: "images" })

    const formData = await request.formData()
    const file = formData.get("image") as File

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 })
    }

    const buffer = Buffer.from(await file.arrayBuffer())
    const filename = `${Date.now()}-${file.name}`

    const uploadStream = bucket.openUploadStream(filename, {
      contentType: file.type,
    })

    const fileId = uploadStream.id

    uploadStream.end(buffer)

    return new Promise((resolve, reject) => {
      uploadStream.on("finish", () => {
        resolve(NextResponse.json({ imageUrl: `/api/images/${fileId}` }, { status: 200 }))
      })

      uploadStream.on("error", (error) => {
        console.error("Error uploading file:", error)
        reject(NextResponse.json({ error: "Failed to upload file" }, { status: 500 }))
      })
    })
  } catch (error) {
    console.error("Error in POST /api/upload:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}