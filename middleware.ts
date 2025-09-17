import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'; // Use Node.js runtime for jwt.verify

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;

  console.log(`Middleware: Path: ${path}, Token: ${token ? token : "missing"}`);

  const publicRoutes = ["/", "/login", "/register"];
  const restrictedRoutes = ["/shop", "/profile", "/admin"];

  // Handle public routes (/, /login, /register)
  if (publicRoutes.includes(path)) {
    if (token && (path === "/" || path === "/login" || path === "/register")) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
        console.log(`Middleware: Token verified, role: ${decoded.role}, userId: ${decoded.userId}`);
        const redirectPath = decoded.role === "admin" ? "/admin" : "/shop";
        console.log(`Middleware: Redirecting ${decoded.role} user to ${redirectPath} from ${path}`);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      } catch (error: any) {
        console.error(`Middleware: Token verification failed for ${path}: ${error.message}`);
        const response = NextResponse.next();
        response.cookies.delete("token");
        return response;
      }
    }
    console.log(`Middleware: Allowing public route: ${path}`);
    return NextResponse.next();
  }

  // Handle restricted routes (/shop, /profile, /admin)
  if (restrictedRoutes.includes(path)) {
    if (!token) {
      console.log(`Middleware: No token, redirecting to /login from ${path}`);
      return NextResponse.redirect(new URL("/login", request.url));
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Middleware: Token verified for ${path}, role: ${decoded.role}, userId: ${decoded.userId}`);

      if (path === "/shop" && decoded.role === "admin") {
        console.log("Middleware: Admin accessing /shop, redirecting to /admin");
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      if (path === "/admin" && decoded.role !== "admin") {
        console.log("Middleware: Non-admin accessing /admin, redirecting to /shop");
        return NextResponse.redirect(new URL("/shop", request.url));
      }

      if (path === "/profile" && decoded.role === "admin") {
        console.log("Middleware: Admin accessing /profile, redirecting to /admin");
        return NextResponse.redirect(new URL("/admin", request.url));
      }

      console.log(`Middleware: Allowing ${path} for role: ${decoded.role}`);
      return NextResponse.next();
    } catch (error: any) {
      console.error(`Middleware: Invalid token for ${path}: ${error.message}, clearing token and redirecting to /login`);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      return response;
    }
  }

  console.log(`Middleware: Allowing ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/shop", "/profile", "/admin", "/login", "/register"],
};