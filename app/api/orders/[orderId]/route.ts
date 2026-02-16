import { NextRequest, NextResponse } from "next/server";
import { getDb } from "@/lib/mongodb";
import type { OrderDocument } from "@/lib/orders/types";

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ orderId: string }> }
) {
  const { orderId } = await params;
  if (!orderId) {
    return NextResponse.json({ error: "Missing orderId" }, { status: 400 });
  }

  try {
    const db = getDb();
    const order = await db
      .collection<OrderDocument>("orders")
      .findOne({ orderId });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    return NextResponse.json({
      orderId: order.orderId,
      items: order.items,
      shipping: order.shipping,
      payment: order.payment,
      totals: order.totals,
      status: order.status,
      date: order.createdAt,
    });
  } catch (e) {
    console.error("Order fetch error:", e);
    return NextResponse.json(
      { error: "Failed to fetch order" },
      { status: 500 }
    );
  }
}
