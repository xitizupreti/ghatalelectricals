import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      console.error('No file uploaded');
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Ensure the filename is safe
    const filename = Date.now() + '-' + file.name.replace(/[^a-zA-Z0-9.-]/g, '-');
    const uploadDir = path.join(process.cwd(), 'public', 'images');
    const filepath = path.join(uploadDir, filename);

    console.log('Attempting to save file:', filepath);

    await writeFile(filepath, buffer);
    console.log('File saved successfully');

    return NextResponse.json({ filename: `/images/${filename}` });
  } catch (error) {
    console.error('Error in file upload:', error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}