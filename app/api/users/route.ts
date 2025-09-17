import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'; // Ensure Node.js runtime for jwt

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log(`Users API: Token: ${token ? token : "missing"}`);

    if (!token) {
      console.error("Users API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Users API: Token verified, userId: ${decoded.userId}, role: ${decoded.role}`);
    } catch (error: any) {
      console.error(`Users API: Token verification failed: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Users API: Non-admin user attempted access, userId:", decoded.userId);
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const [users] = await db.query("SELECT id, name, email, phone, address, role, created_at FROM users WHERE role = ?", ["user"]);
    console.log("Users API: Fetched non-admin users:", users);

    return NextResponse.json(users);
  } catch (error: any) {
    console.error("Users API: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}