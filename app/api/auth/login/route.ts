import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'; // Ensure Node.js runtime for bcrypt and jwt

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    console.log(`Login API: Attempting login for email: ${email}`);

    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    const user = (users as any[])[0];

    if (!user) {
      console.error("Login API: User not found");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      console.error("Login API: Invalid password");
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const token = jwt.sign(
      { userId: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: "1h" }
    );

    console.log(`Login API: Generated token for userId: ${user.id}, role: ${user.role}`);

    const response = NextResponse.json({ user: { id: user.id, name: user.name, email: user.email, role: user.role } });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3600, // 1 hour
      path: "/",
    });

    return response;
  } catch (error: any) {
    console.error("Login API: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}