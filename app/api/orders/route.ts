import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getDb } from "@/lib/mongodb";
import {
  generateOrderId,
  SHIPPING_FEE,
  type OrderDocument,
  type OrderItemSnapshot,
  type OrderShipping,
  type OrderPayment,
} from "@/lib/orders/types";

export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: await headers() });
    const body = await request.json();
    const {
      shipping,
      payment,
      items,
    }: {
      shipping: OrderShipping;
      payment: OrderPayment;
      items: OrderItemSnapshot[];
    } = body;

    if (
      !shipping ||
      !payment ||
      !Array.isArray(items) ||
      items.length === 0
    ) {
      return NextResponse.json(
        { error: "Missing shipping, payment, or items" },
        { status: 400 }
      );
    }

    const subtotal = items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );
    const total = subtotal + SHIPPING_FEE;

    const orderId = generateOrderId();
    const now = new Date();
    const doc: OrderDocument = {
      orderId,
      userId: session?.user?.id,
      items,
      shipping: {
        firstName: shipping.firstName ?? "",
        lastName: shipping.lastName ?? "",
        email: shipping.email ?? "",
        phone: shipping.phone ?? "",
        apartment: shipping.apartment ?? "",
        city: shipping.city ?? "",
        state: shipping.state ?? "",
        postalCode: shipping.postalCode ?? "",
        country: shipping.country ?? "",
      },
      payment: {
        method: payment.method ?? "bank-transfer",
        transactionId: payment.transactionId ?? "",
      },
      totals: { subtotal, shipping: SHIPPING_FEE, total },
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };

    const db = getDb();
    await db.collection<OrderDocument>("orders").insertOne(doc);

    return NextResponse.json({ orderId });
  } catch (e) {
    console.error("Order create error:", e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const mine = searchParams.get("mine") === "1";

  if (!mine) {
    return NextResponse.json({ error: "Use ?mine=1 to list your orders" }, { status: 400 });
  }

  try {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session?.user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const db = getDb();
    const orders = await db
      .collection<OrderDocument>("orders")
      .find({ userId: session.user.id })
      .sort({ createdAt: -1 })
      .toArray();

    const serialized = orders.map((o) => ({
      orderId: o.orderId,
      items: o.items,
      shipping: o.shipping,
      payment: o.payment,
      totals: o.totals,
      status: o.status,
      date: o.createdAt,
    }));

    return NextResponse.json(serialized);
  } catch (e) {
    console.error("Orders list error:", e);
    return NextResponse.json(
      { error: "Failed to list orders" },
      { status: 500 }
    );
  }
}
