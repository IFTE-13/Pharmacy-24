import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const { name, email, password, role } = await request.json();

    if (!email || !password) {
      console.error("Register API: Missing email or password");
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const [existing] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if ((existing as any[]).length > 0) {
      console.error("Register API: User already exists for email:", email);
      return NextResponse.json({ error: "User already exists" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const validRole = role === "admin" ? "admin" : "user";

    const [result] = await db.query(
      "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
      [name || null, email, hashedPassword, validRole]
    );

    const userId = (result as any).insertId;
    const token = jwt.sign({ userId, role: validRole }, JWT_SECRET, { expiresIn: "7d" });

    const response = NextResponse.json({ user: { id: userId, name, email, role: validRole } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Register API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}