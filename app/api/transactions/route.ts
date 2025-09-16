import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("Transactions API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Transactions API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const [transactions] = await db.query(
      "SELECT id, amount, description, created_at FROM transactions WHERE user_id = ? ORDER BY created_at DESC",
      [decoded.userId]
    );

    console.log("Transactions API: Fetched transactions for user:", decoded.userId);
    return NextResponse.json(transactions);
  } catch (error) {
    console.error("Transactions API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";