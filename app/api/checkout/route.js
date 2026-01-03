// app/api/checkout/route.js
export const runtime = "nodejs"; // ensure full Node.js runtime (required for AWS Stripe SDK)

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(request) {
  try {
    // Read request body
    const body = await request.json();
    console.log("[Checkout] Request body:", JSON.stringify(body, null, 2));

    const { totalItems } = body;
    if (!totalItems || !totalItems.length) {
      console.error("[Checkout] Error: Cart is empty or invalid.");
      return new Response(
        JSON.stringify({ error: "Cart is empty or invalid." }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Detect origin (Vercel or AWS)
    const requestOrigin = request.headers.get("origin") || "";
    const allowedOrigins = [
      "https://e-commerce-next-js-stripe.vercel.app",
      "https://main.dij502211kgtj.amplifyapp.com",
    ];

    // If the requestOrigin matches allowedOrigins, use it; else fallback to NEXT_PUBLIC_BASE_URL or first allowed
    const origin =
      allowedOrigins.includes(requestOrigin)
        ? requestOrigin
        : process.env.NEXT_PUBLIC_BASE_URL || allowedOrigins[0];

    const success_url = process.env.STRIPE_SUCCESS_URL || `${origin}/success`;
    const cancel_url = process.env.STRIPE_CANCEL_URL || `${origin}/`;

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: totalItems.map((item) => ({
        price: item.price,
        quantity: item.quantity,
      })),
      success_url,
      cancel_url,
    });

    console.log("[Checkout] Session created:", session.id, session.url);

    return new Response(JSON.stringify({ id: session.id, url: session.url }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("[Checkout] Stripe checkout error:", err);
    return new Response(
      JSON.stringify({
        error: "Failed to create checkout session",
        details: err.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
