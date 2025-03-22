import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
 

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname; //get the path of the request
    const isPublicPath = path === '/login' || path === '/signup' ; //check if the path is public
    const token = request.cookies.get('token')?.value|| ''; //get the token from the cookie
    if(isPublicPath && token){
        return NextResponse.redirect(new URL('/',request.nextUrl))
    }
    if(!isPublicPath && !token){
        return NextResponse.redirect(new URL('/login',request.nextUrl))
    }
}

export const config = {
  matcher: [
    '/',
    '/profile',
    '/login',
    '/signup',
    '/profile/:path',
    '/verifyemail'
  ],
}