import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    console.log("[Checkout] Request body:", JSON.stringify(body, null, 2));

    const { totalItems } = body;

    if (!totalItems || !totalItems.length) {
      console.error("[Checkout] Error: No items in cart");
      return new Response(
        JSON.stringify({ error: "Cart is empty" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    // Determine origin URL
    const origin =
      process.env.STRIPE_SUCCESS_URL?.replace("/success", "") ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    console.log("[Checkout] Using origin:", origin);

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: totalItems,
      success_url: process.env.STRIPE_SUCCESS_URL || `${origin}/success`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${origin}/`,
    });

    console.log("[Checkout] Session created:", session.id, session.url);

    return new Response(
      JSON.stringify({ url: session.url }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (err) {
    console.error("[Checkout] Stripe checkout error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to create checkout" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
