import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("Change-Password API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Change-Password API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { currentPassword, newPassword, confirmPassword } = await request.json();
    if (!currentPassword || !newPassword || !confirmPassword) {
      console.error("Change-Password API: Missing required fields");
      return NextResponse.json({ error: "All fields are required" }, { status: 400 });
    }

    if (newPassword !== confirmPassword) {
      console.error("Change-Password API: Passwords do not match");
      return NextResponse.json({ error: "New passwords do not match" }, { status: 400 });
    }

    const [users] = await db.query("SELECT password FROM users WHERE id = ?", [decoded.userId]);
    const user = (users as any[])[0];

    if (!user) {
      console.error("Change-Password API: User not found for ID:", decoded.userId);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!(await bcrypt.compare(currentPassword, user.password))) {
      console.error("Change-Password API: Incorrect current password");
      return NextResponse.json({ error: "Incorrect current password" }, { status: 401 });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE id = ?", [hashedPassword, decoded.userId]);

    console.log("Change-Password API: Password changed for user:", decoded.userId);
    return NextResponse.json({ message: "Password changed successfully" });
  } catch (error) {
    console.error("Change-Password API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";