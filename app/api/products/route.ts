import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/db";
import jwt from "jsonwebtoken";

export const runtime = 'nodejs'; // Ensure Node.js runtime for jwt

const JWT_SECRET = process.env.JWT_SECRET || "my-super-secure-key-12345";

export async function POST(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log(`Products API [POST]: Token: ${token ? token : "missing"}`);

    if (!token) {
      console.error("Products API [POST]: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Products API [POST]: Token verified, userId: ${decoded.userId}, role: ${decoded.role}`);
    } catch (error: any) {
      console.error(`Products API [POST]: Token verification failed: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Products API [POST]: Non-admin user attempted access, userId:", decoded.userId);
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { name, price, company } = await request.json();
    if (!name || !price || !company) {
      console.error("Products API [POST]: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await db.query(
      "INSERT INTO products (name, price, company, created_at) VALUES (?, ?, ?, NOW())",
      [name, price, company]
    );
    const insertId = (result as any).insertId;
    console.log(`Products API [POST]: Created product, id: ${insertId}`);

    return NextResponse.json({ id: insertId, name, price, company, created_at: new Date().toISOString() });
  } catch (error: any) {
    console.error("Products API [POST]: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log(`Products API [PUT]: Token: ${token ? token : "missing"}`);

    if (!token) {
      console.error("Products API [PUT]: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Products API [PUT]: Token verified, userId: ${decoded.userId}, role: ${decoded.role}`);
    } catch (error: any) {
      console.error(`Products API [PUT]: Token verification failed: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Products API [PUT]: Non-admin user attempted access, userId:", decoded.userId);
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id, name, price, company } = await request.json();
    if (!id || !name || !price || !company) {
      console.error("Products API [PUT]: Missing required fields");
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const [result] = await db.query(
      "UPDATE products SET name = ?, price = ?, company = ? WHERE id = ?",
      [name, price, company, id]
    );
    if ((result as any).affectedRows === 0) {
      console.error("Products API [PUT]: Product not found, id:", id);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log(`Products API [PUT]: Updated product, id: ${id}`);
    return NextResponse.json({ id, name, price, company, created_at: new Date().toISOString() });
  } catch (error: any) {
    console.error("Products API [PUT]: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log(`Products API [DELETE]: Token: ${token ? token : "missing"}`);

    if (!token) {
      console.error("Products API [DELETE]: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Products API [DELETE]: Token verified, userId: ${decoded.userId}, role: ${decoded.role}`);
    } catch (error: any) {
      console.error(`Products API [DELETE]: Token verification failed: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Products API [DELETE]: Non-admin user attempted access, userId:", decoded.userId);
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const { id } = await request.json();
    if (!id) {
      console.error("Products API [DELETE]: Missing product id");
      return NextResponse.json({ error: "Missing product id" }, { status: 400 });
    }

    const [result] = await db.query("DELETE FROM products WHERE id = ?", [id]);
    if ((result as any).affectedRows === 0) {
      console.error("Products API [DELETE]: Product not found, id:", id);
      return NextResponse.json({ error: "Product not found" }, { status: 404 });
    }

    console.log(`Products API [DELETE]: Deleted product, id: ${id}`);
    return NextResponse.json({ message: "Product deleted successfully" });
  } catch (error: any) {
    console.error("Products API [DELETE]: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value;
    console.log(`Products API [GET]: Token: ${token ? token : "missing"}`);

    if (!token) {
      console.error("Products API [GET]: No token found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded: any;
    try {
      decoded = jwt.verify(token, JWT_SECRET) as { userId: number; role: string };
      console.log(`Products API [GET]: Token verified, userId: ${decoded.userId}, role: ${decoded.role}`);
    } catch (error: any) {
      console.error(`Products API [GET]: Token verification failed: ${error.message}`);
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    if (decoded.role !== "admin") {
      console.error("Products API [GET]: Non-admin user attempted access, userId:", decoded.userId);
      return NextResponse.json({ error: "Forbidden: Admin access required" }, { status: 403 });
    }

    const [products] = await db.query("SELECT id, name, price, company, created_at FROM products");
    console.log("Products API [GET]: Fetched products:", products);

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("Products API [GET]: Error:", error.message);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}