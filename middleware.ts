import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  
  response.headers.set('x-current-path', request.nextUrl.pathname);
  response.headers.set('x-current-search', request.nextUrl.search);
  
  const referer = request.headers.get('referer');
  if (referer) {
    response.headers.set('x-referer', referer);
    
    try {
      const refererUrl = new URL(referer);
      const currentUrl = new URL(request.url);
      
      if (refererUrl.origin === currentUrl.origin) {
        response.headers.set('x-internal-referer', refererUrl.pathname);
      }
    } catch (error) {
    }
  }
  
  const userAgent = request.headers.get('user-agent');
  if (userAgent) {
    response.headers.set('x-user-agent', userAgent);
  }
  
  response.headers.set('x-request-timestamp', new Date().toISOString());
  
  return response;
}

export const config = {
  matcher: [
    '/docs/:path*',
  ]
};