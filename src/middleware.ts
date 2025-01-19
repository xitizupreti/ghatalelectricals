import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const authToken = request.cookies.get('authToken');

  // Check if the user is authenticated
  if (!authToken) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

// Match all routes under /admin
export const config = {
  matcher: ['/admin/:path*'],
};
