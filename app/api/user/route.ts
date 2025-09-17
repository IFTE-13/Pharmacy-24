import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("User API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
      console.log("User API: Token verified, userId:", decoded.userId);
    } catch (error) {
      console.error("User API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const [users] = await db.query("SELECT id, name, email, role FROM users WHERE id = ?", [decoded.userId]);
    const user = (users as any[])[0];

    if (!user) {
      console.error("User API: User not found for ID:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    console.log("User API: Fetched user:", user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("User API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}