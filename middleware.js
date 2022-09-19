
import { NextResponse } from 'next/server'
import axios from 'axios'

export async function middleware(req) {
  // Allow the req if the following is true...
  const { pathname } = req.nextUrl

  if (pathname === '/') {
    return NextResponse.redirect(new URL('/browse', req.url))
  }
}
