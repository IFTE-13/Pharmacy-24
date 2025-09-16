import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("User API: Missing token in cookies");
      return NextResponse.json({ error: "Missing token" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (jwtError) {
      console.error("User API: JWT verification failed:", jwtError);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const [users] = await db.query("SELECT id, name, email, phone, address, role FROM users WHERE id = ?", [decoded.userId]);
    const user = (users as any[])[0];

    if (!user) {
      console.error("User API: User not found for ID:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("User API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}