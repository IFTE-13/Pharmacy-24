import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      console.error("Login API: Missing email or password");
      return NextResponse.json({ error: "Missing email or password" }, { status: 400 });
    }

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = (users as any[])[0];

    if (!user) {
      console.error("Login API: User not found for email:", email);
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    if (!(await bcrypt.compare(password, user.password))) {
      console.error("Login API: Incorrect password for email:", email);
      return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
    }

    const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: "7d" });
    console.log("Login API: Success, generated token for user:", user.id);

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}