import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = "nodejs"; // Force Node.js runtime

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  console.log("Middleware: Token from cookies:", token);

  if (!token) {
    console.log("Middleware: No token found, redirecting to /login from:", request.nextUrl.pathname);
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    jwt.verify(token, JWT_SECRET);
    console.log("Middleware: Token verified for:", request.nextUrl.pathname);
    return NextResponse.next();
  } catch (error) {
    console.error("Middleware: Token verification failed:", error);
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*"],
};