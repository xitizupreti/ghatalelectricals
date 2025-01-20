import { NextResponse } from "next/server"

export async function POST(request: Request) {
  const { username, password } = await request.json()

  const adminUsername = process.env.ADMIN_USERNAME
  const adminPassword = process.env.ADMIN_PASSWORD

  if (username === adminUsername && password === adminPassword) {
    const response = NextResponse.json({ success: true })
    const date = new Date()
    date.setDate(date.getDate() + 3) // Expire in 3 days
    response.cookies.set("authToken", "valid", {
      expires: date,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
    })
    return response
  } else {
    return NextResponse.json({ success: false }, { status: 401 })
  }
}

