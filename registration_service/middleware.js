// middleware.js

import { NextResponse } from 'next/server';

export function middleware(req) {
  const origin = req.headers.get('origin');
  const response = NextResponse.next();

  const allowedOrigins = ['http://localhost:4028'];

  if (origin && allowedOrigins.includes(origin)) {
    response.headers.set('Access-Control-Allow-Origin', origin);
    response.headers.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    response.headers.set('Access-Control-Allow-Credentials', 'true');
  }

  // Handle preflight (OPTIONS) requests
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': origin || '*',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Credentials': 'true',
      },
    });
  }

  return response;
}

export const config = {
  matcher: ['/api/:path*'], // Apply to all API routes
};

