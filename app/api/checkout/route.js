import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2023-08-16",
});

export async function POST(request) {
  try {
    const body = await request.json();
    const { totalItems } = body;

    console.log("[Checkout] Request body:", { totalItems });

    // Determine origin: deployed URL or fallback
    const origin =
      process.env.NEXT_PUBLIC_BASE_URL ||
      request.headers.get("origin") ||
      "http://localhost:3000";

    // Create Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: totalItems,
      success_url: process.env.STRIPE_SUCCESS_URL || `${origin}/success`,
      cancel_url: process.env.STRIPE_CANCEL_URL || `${origin}/`,
    });

    console.log("[Checkout] Session created:", session.id);

    return new Response(JSON.stringify(session), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Stripe checkout error:", err);
    return new Response(
      JSON.stringify({ error: err.message || "Failed to create checkout" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
