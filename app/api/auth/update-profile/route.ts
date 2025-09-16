import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("Update-Profile API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Update-Profile API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { name, phone, address } = await request.json();
    if (!name && !phone && !address) {
      console.error("Update-Profile API: No fields provided");
      return NextResponse.json({ error: "At least one field is required" }, { status: 400 });
    }

    const [result] = await db.query(
      "UPDATE users SET name = ?, phone = ?, address = ? WHERE id = ?",
      [name || null, phone || null, address || null, decoded.userId]
    );

    if ((result as any).affectedRows === 0) {
      console.error("Update-Profile API: User not found for ID:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const [rows] = await db.query("SELECT id, name, email, role, phone, address FROM users WHERE id = ?", [decoded.userId]);
    const updatedUser = rows as any[];
    console.log("Update-Profile API: Profile updated for user:", decoded.userId);
    return NextResponse.json(updatedUser[0]);
  } catch (error) {
    console.error("Update-Profile API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";