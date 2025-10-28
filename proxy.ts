import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { isMarkdownPreferred } from 'fumadocs-core/negotiation';

export function proxy(request: NextRequest) {
  // Handle AI agents requesting markdown via Accept header
  if (isMarkdownPreferred(request)) {
    const pathname = request.nextUrl.pathname;
    // Rewrite /docs/* to /llms.mdx/*
    if (pathname.startsWith('/docs/')) {
      const newPath = pathname.replace('/docs/', '/llms.mdx/');
      return NextResponse.rewrite(new URL(newPath, request.nextUrl));
    }
  }
  
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
    } catch {
      // Invalid referer URL, ignore
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