import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.log("Check-Token API: No token found in cookies");
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    jwt.verify(token, JWT_SECRET);
    console.log("Check-Token API: Token valid");
    return NextResponse.json({ valid: true });
  } catch (error) {
    console.error("Check-Token API: Token verification failed:", error);
    return NextResponse.json({ error: "Invalid token" }, { status: 401 });
  }
}

export const runtime = "nodejs"; // Ensure Node.js runtime for jwt