import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token) {
      console.error("Create-Transaction API: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET);
    } catch (error) {
      console.error("Create-Transaction API: Token verification failed:", error);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    const { items, total } = await request.json();
    if (!items || items.length === 0) {
      console.error("Create-Transaction API: No items provided");
      return NextResponse.json({ error: "Cart is empty" }, { status: 400 });
    }

    const description = `Checkout of ${items.length} item(s)`;
    const [result] = await db.query(
      "INSERT INTO transactions (user_id, amount, description) VALUES (?, ?, ?)",
      [decoded.userId, total, description]
    );

    if ((result as any).affectedRows === 0) {
      console.error("Create-Transaction API: Failed to create transaction for user:", decoded.userId);
      return NextResponse.json({ error: "Failed to create transaction" }, { status: 500 });
    }

    console.log("Create-Transaction API: Transaction created for user:", decoded.userId, "Total:", total);
    return NextResponse.json({ message: "Transaction created successfully" });
  } catch (error) {
    console.error("Create-Transaction API: Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export const runtime = "nodejs";