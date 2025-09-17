import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("Transactions-All API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Transactions-All API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Transactions-All API: Access denied, not an admin");
      return NextResponse.json({ error: "Access denied" }, { status: 403 });
    }

    const [rows] = await db.query(
      "SELECT t.id, t.user_id, u.email, t.amount, t.description, t.created_at FROM transactions t JOIN users u ON t.user_id = u.id"
    );
    console.log("Transactions-All API: Fetched transactions for admin:", decoded.userId);
    return NextResponse.json(rows as any[]);
  } catch (error) {
    console.error("Transactions-All API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";