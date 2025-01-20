import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get("authToken")

  // Check if the user is authenticated
  if (!authToken || authToken.value !== "valid") {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  // Add a header to indicate the user is authenticated
  const response = NextResponse.next()
  response.headers.set("x-auth-status", "authenticated")

  return response
}

// Match all routes under /admin
export const config = {
  matcher: ["/admin/:path*"],
}

