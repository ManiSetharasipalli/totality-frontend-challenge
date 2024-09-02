import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token');

  // Here you would verify the token, but for simplicity, we'll assume it exists
  const isLoggedIn = Boolean(token);

  const response = NextResponse.next();
  response.cookies.set('isLoggedIn', isLoggedIn ? 'true' : 'false');
  return response;
}

export const config = {
  matcher: ['/user'] 
};
