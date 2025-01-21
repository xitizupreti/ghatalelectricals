import { NextResponse } from "next/server";
import { connectDB } from "@/app/lib/db";
import mongoose from "mongoose";
import { GridFSBucket } from "mongodb";

export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  try {
    await connectDB();
    const db = mongoose.connection.db;
    if (!db) {
      throw new Error("Database connection failed");
    }
    const bucket = new GridFSBucket(db, { bucketName: "images" });

    const { id } = await context.params;
    const objectId = new mongoose.Types.ObjectId(id);
    const filePath = `/api/images/${id}`;
    const fullUrl = `${process.env.BASE_URL}${filePath}`;
    const file = await bucket.find({ _id: objectId }).toArray();

    if (!file || file.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }

    const downloadStream = bucket.openDownloadStream(objectId);

    const chunks: Uint8Array[] = [];
    for await (const chunk of downloadStream) {
      chunks.push(chunk);
    }

    const buffer = Buffer.concat(chunks);

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": file[0].contentType || "application/octet-stream",
        "Content-Length": buffer.length.toString(),
        Location: fullUrl,
      },
    });
  } catch (error) {
    console.error("Error in GET /api/images/[id]:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
