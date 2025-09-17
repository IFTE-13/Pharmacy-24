import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'; // Use Node.js runtime for jwt.verify

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const path = request.nextUrl.pathname;
  console.log(`Middleware: Processing request for path: ${path}, Token: ${token ? token : "missing"}`);

  const publicRoutes = ["/", "/login", "/register"];
  const restrictedRoutes = ["/shop", "/profile", "/admin"];
  const adminApiRoutes = ["/api/users", "/api/products"];

  // Handle public routes (/, /login, /register)
  if (publicRoutes.includes(path)) {
    if (token) {
      try {
        const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
        console.log(`Middleware: Token verified for public route ${path}, role: ${decoded.role}, userId: ${decoded.userId}`);
        const redirectPath = decoded.role === "admin" ? "/admin" : "/shop";
        console.log(`Middleware: Redirecting ${decoded.role} user to ${redirectPath} from ${path}`);
        return NextResponse.redirect(new URL(redirectPath, request.url));
      } catch (error: any) {
        console.error(`Middleware: Token verification failed for ${path}: ${error.message}`);
        const response = NextResponse.next();
        response.cookies.delete("token");
        console.log(`Middleware: Cleared invalid token for ${path}`);
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
      console.log(`Middleware: Token verified for restricted route ${path}, role: ${decoded.role}, userId: ${decoded.userId}`);

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

      console.log(`Middleware: Allowing restricted route ${path} for role: ${decoded.role}`);
      return NextResponse.next();
    } catch (error: any) {
      console.error(`Middleware: Invalid token for ${path}: ${error.message}`);
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("token");
      console.log(`Middleware: Cleared invalid token and redirecting to /login from ${path}`);
      return response;
    }
  }

  // Handle admin API routes (/api/users, /api/products)
  if (adminApiRoutes.some(route => path === route)) {
    if (!token) {
      console.error(`Middleware: No token for admin API ${path}, returning 401`);
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    try {
      const decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Middleware: Token verified for admin API ${path}, role: ${decoded.role}, userId: ${decoded.userId}`);

      if (decoded.role !== "admin") {
        console.error(`Middleware: Non-admin accessing ${path}, returning 403`);
        return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
      }

      console.log(`Middleware: Allowing admin API ${path} for admin`);
      return NextResponse.next();
    } catch (error: any) {
      console.error(`Middleware: Invalid token for admin API ${path}: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }
  }

  // Allow all other API routes (e.g., /api/auth/user, /api/auth/login, /api/transactions/all)
  console.log(`Middleware: Allowing API route: ${path}`);
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/shop", "/profile", "/admin", "/login", "/register", "/api/users", "/api/products"],
};